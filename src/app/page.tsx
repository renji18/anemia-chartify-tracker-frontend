"use client";

import { useEffect, useMemo, useState } from 'react';
import { getData } from '../redux/actions';
import { useAppDispatch, useAppSelector } from '@/utility/type';
import FilledLinedCharts from '@/components/FilledLineChart';

interface DataItem {
  data: {
    "Adolescents (10 - 19 years)": String[];
    "Children (6 - 9 years)": String[];
    "Children (6 - 59 months)": String[];
    "Index Value": String[];
    "Pregnant Women": String[];
    Rank: String[];
    Mothers: String[];
    District: String;
  }[];
  quarters: String;
  state: String;
}


interface CityData {
  "Adolescents (10 - 19 years)": String[];
  "Children (6 - 9 years)": String[];
  "Children (6 - 59 months)": String[];
  "Index Value": String[];
  "Pregnant Women": String[];
  Rank: String[];
  Mothers: String[];
  District: String;
}


export default function Home() {
   const dispatch = useAppDispatch();
   const [state, setState] = useState<String[]>([]);
   const [cityData, setCityData] = useState<DataItem['data']>([]);
  const [city, setCity] = useState<String[]>([]);
  const [catData, setCatData] = useState<DataItem['data']>([]);
  const [cat, setCat] = useState<String[]>([]);
  const [selectedCategoryData, setSelectedCategoryData] = useState<String[]>([]);
  const [selectedCity, setSelectedCity] = useState<String | null>(null);

  const { data } : DataItem = useAppSelector((state:any) => state?.data);
  console.log(data)
  const dynamicStateValues = useMemo(() =>
    data?.map((value: any) => value.state.toString()) || [], [data]);


    const handleStateChange = (selectedState: String) => {
      setSelectedCity(null);
      const selectedData: any = data.find((item: any) => item.state === selectedState);
      console.log(selectedData)
      
      if (selectedData) {
        setCityData(selectedData.data);
        setCity(selectedData.data.map((item : CityData) => item.District));
      } else {
        setCity([]);
        setCityData([]);
      }
    };

const handleCityChange = (selectedCity: String) => {
  setSelectedCity(selectedCity);
  const selectedData = cityData.find(
    (item) => item.District === selectedCity
  );

  if (selectedData) {
  const catKeys = Object.keys(selectedData)
    .filter((key) => key !== "District")
    setCat(catKeys);
  } else {
    setCat([]);
  }
};

const handleCategoryChange = (selectedCategory: string) => {
  if (selectedCity) {
    const selectedCityData: CityData | undefined = cityData.find(
      (item) => item.District === selectedCity
    );

    if (selectedCityData) {
      console.log(selectedCityData)

       const categoryData: string[] | undefined =
         selectedCityData[selectedCategory];

       console.log(categoryData);
        if (categoryData !== undefined) {
        setSelectedCategoryData(categoryData);
      } else {
        console.log(`Category '${selectedCategory}' not found in selectedCityData.`);
        setSelectedCategoryData([]);
      }
    }
    } else {
      setSelectedCategoryData([]);
    }
};


   useEffect(() => {
    dispatch(getData());
   }, [dispatch]);

   useEffect(() => {
    setState(dynamicStateValues);
   },[dynamicStateValues])

   useEffect(() => {
     console.log(cityData);
   }, [cityData]);

   useEffect(() => {
     console.log(selectedCategoryData);
   }, [selectedCategoryData]);

   

  return (
    <div className="p-10 min-h-screen">
      <div className="flex justify-evenly">
        <div className="w-[30%]">
          <select
            name="state"
            id="state"
            onChange={(e) => handleStateChange(e.target.value)}
            className="p-2 w-full rounded-md outline-none"
          >
            <option value="">Select the state</option>
            {state &&
              state.map((item: String, key: number) => (
                <option
                  style={{ padding: "10px" }}
                  key={key}
                  value={item.toString()}
                >
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className="w-[30%]">
          <select
            name="city"
            id="city"
            disabled={!city.length}
            onChange={(e) => handleCityChange(e.target.value)}
            className="p-2 w-full rounded-md outline-none disabled:cursor-not-allowed"
          >
            <option value="">Select the city</option>
            {city &&
              city.map((item: String, key: number) => (
                <option key={key} value={item?.toString()}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className="w-[30%]">
          <select
            name="cat"
            id="cat"
            disabled={!cat.length}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-2 w-full rounded-md outline-none disabled:cursor-not-allowed"
          >
            <option value="">Select the category</option>
            {cat &&
              cat.map((item: String, key: number) => (
                <option key={key} value={item.toString()}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center items-center w-full flex-wrap">
        <div className="w-4/5">
          <FilledLinedCharts />
        </div>
      </div>
    </div>
  );
}
