import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Footer from "../Components/Footer";
import Headers from "../Components/header";
import { useAuth } from "../context/authContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress';
import Slider from '@mui/material/Slider'; // Import Slider from Material-UI
import { styled } from '@mui/material/styles';

const SkeletonCard = () => (
  <div className="border rounded-lg p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="rounded-full bg-slate-200 h-40 w-40 mx-auto"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

const GlassSlider = styled(Slider)(({ theme }) => ({
  color: '#fdba74', // This is the Tailwind orange-300 color
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#fdba74',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fdba74',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#fdba74',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#fdba74',
  },
}));

export default function Matri() {
  const { userLoggedIn } = useAuth();
  const [loggedUser, setLoggedUser] = useState(null); // Changed initial state to null
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate(); // Use useNavigate from react-router-dom
  const [loggedUserGender, setLoggedUserGender] = useState(null);

  const [searchTerms, setSearchTerms] = useState({
    religion: "",
    language: "",
    prof: "",
  });
  const [user, setUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ageRange, setAgeRange] = useState({ low: 20, high: 60 });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange({
      low: newValue[0],
      high: newValue[1]
    });
  };

  const loadData = async () => {
    setIsLoading(true);
    const db = getFirestore();
    const usersCollection = collection(db, "users");

    try {
      const querySnapshot = await getDocs(usersCollection);
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser(userData);

      // Get logged user's gender
      const loggedUserData = userData.find(user => user.uid === loggedUser);
      const loggedUserGender = loggedUserData ? loggedUserData.sex : null;
      setLoggedUserGender(loggedUserGender);

      // Filter out users of the same gender
      const oppositeGenderUsers = userData.filter(user => user.sex !== loggedUserGender);
      setFilteredData(oppositeGenderUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevState) => ({ ...prevState, [name]: value }));
  };

  const filterData = () => {
    const filtered = user.filter((item) => {
      const professionLower = item.profession ?
        item.profession.toLowerCase() :
        "";
      const mothertongueLower = item.motherTongue ?
        item.motherTongue.toLowerCase() :
        "";
      const religionLower = item.religion ? item.religion.toLowerCase() : "";
      const age = item.age ? parseInt(item.age) : 0;
      const oppositeGender = loggedUserGender === 'male' ? 'female' : 'male';

      return (
        professionLower.includes(searchTerms.prof.toLowerCase()) &&
        mothertongueLower.includes(searchTerms.language.toLowerCase()) &&
        religionLower.includes(searchTerms.religion.toLowerCase()) &&
        age >= ageRange.low &&
        age <= ageRange.high &&
        item.sex === oppositeGender // Only show opposite gender profiles
      );
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user.uid); // Use user.uid directly
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (loggedUser) {
      loadData();
    }
  }, [loggedUser]);

  useEffect(() => {
    filterData();
  }, [user, searchTerms, ageRange, loggedUserGender]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <Headers />
      <div className="flex justify-between">
        <button
          className="fixed top-14 left-0 mt-4 ml-4 bg-cyan-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => window.history.back()}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <div className="mt-32 sm:mt-28 px-4 md:px-24">
          <button
            onClick={toggleFilterVisibility}
            className="bg-cyan-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </button>
      </div>
      </div>

      <div>
        {isFilterVisible && (
          <div className="flex flex-wrap justify-between items-center p-4 w-full bg-white pb-10 rounded-lg sm:pl-44 sm:pr-44">
            <input
              type="text"
              name="language"
              placeholder="Language"
              className="border p-2 rounded flex-grow mb-2 sm:mb-0 sm:flex-grow-0 w-full sm:w-1/4 sm:mr-2 bg-white shadow-md"
              value={searchTerms.language}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              name="prof"
              placeholder="Profession"
              className="border p-2 rounded flex-grow mb-2 sm:mb-0 sm:flex-grow-0 w-full sm:w-1/4 sm:mr-2 bg-white shadow-md"
              value={searchTerms.prof}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              name="religion"
              placeholder="Religion"
              className="border p-2 rounded flex-grow mb-2 sm:mb-0 sm:flex-grow-0 w-full sm:w-1/4 sm:mr-2 bg-white shadow-md"
              value={searchTerms.religion}
              onChange={handleSearchChange}
            />
            <div className="w-full sm:w-3/4 mt-4 px-4 mx-auto bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-orange-300">
                Age Range: {ageRange.low} - {ageRange.high}
              </h3>
              <GlassSlider
                getAriaLabel={() => 'Age range slider'}
                value={[ageRange.low, ageRange.high]}
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                min={20}
                max={60}
                marks={[
                  { value: 20, label: '20' },
                  { value: 60, label: '60' },
                ]}
              />
            </div>
          </div>
        )}

        <div className="px-4 md:px-20 mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {isLoading ? (
            // Display skeleton cards while loading
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : !loggedUser ? (
            // Display message when no user is logged in
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="text-center text-gray-500 py-2 mb-4">
                Log in to View Profiles
              </div>
              <button
                onClick={handleLoginRedirect}
                className="bg-orange-300 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Go to Login
              </button>
            </div>
          ) : filteredData.length > 0 ? (
            filteredData
              .filter((data) => loggedUser !== data.uid && data.name) // Filter out the logged-in user's profile and profiles with no name
              .map((data) => (
                <div key={data.id}>
                  <Card
                    name={data.name}
                    sex={data.sex}
                    prof={data.profession}
                    photos={data.photos}
                    uid={data.uid}
                    age={data.age}
                    number={data.number}
                    email={data.email}
                    religion={data.religion}
                    motherTongue={data.motherTongue}
                    description={data.description}
                  />
                </div>
              ))
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center text-gray-500 py-2">
                No profile
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
