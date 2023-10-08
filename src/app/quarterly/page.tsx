"use client"

import { useEffect, useState } from "react"
import {
  CityData,
  DataItem,
  DataSetInterface,
  useAppDispatch,
  useAppSelector,
} from "@/utility/type"
import FilledLinedCharts from "@/components/FilledLineChart"
import Loader from "@/components/Loader"
import { getDataQuarterly } from "@/redux/actions"

type CityDataKey = keyof CityData | ""

export default function Quarterly() {
  const dispatch = useAppDispatch()
  // const [loading, setLoading] = useState<boolean>(true)

  // state data array for showing
  const [availableStates, setAvailableStates] = useState<String[]>([])
  // city data array for showing
  const [availableCities, setAvailableCities] = useState<String[]>([])
  // category data array for showing
  const [categories, setCategories] = useState<String[]>([])

  // city data
  const [selectedStatesCityData, setSelectedStatesCityData] = useState<
    DataItem["quarterly"]
  >([])

  // selected State string
  const [selectedState, setSelectedState] = useState<String | null>(null)

  // selected city string
  const [selectedCity, setSelectedCity] = useState<String | null>(null)

  // selected category
  const [selectedCategory, setSelectedCategory] = useState<CityDataKey>("")

  // y-axis data
  const [selectedCategoryData, setSelectedCategoryData] = useState<
    DataSetInterface[]
  >([])

  // selecting all cities
  const [selectAllCities, setSelectAllCities] = useState<Boolean>(false)

  const { quarterly }: DataItem = useAppSelector((state: any) => state?.data)
  const { loading } = useAppSelector((state) => state?.loader)

  // useEffect to set all avaialbe states to show in the drop down
  useEffect(() => {
    setAvailableStates(
      quarterly?.map((value: any) => value?.state?.toString()).sort() || []
    )
  }, [quarterly])

  // function to create the dropdown options for cities of the selected state in availableCities
  // also stores all the data of the selected state in selectedStatesCityData
  const handleStateChange = (selectedState: String) => {
    setSelectedCity(null)
    setCategories([])
    setSelectAllCities(false)
    setSelectedCategoryData([])
    setSelectedCategory("")
    setSelectedState(selectedState)
    const filteredStateData: any = quarterly?.find(
      (item: any) => item?.state === selectedState
    )
    if (filteredStateData) {
      setSelectedStatesCityData(filteredStateData?.data)
      setAvailableCities(
        filteredStateData?.data?.map((item: CityData) => item?.District)?.sort()
      )
    } else {
      setAvailableCities([])
      setSelectedStatesCityData([])
    }
  }

  // clearing all selected data
  const handleClearSelected = () => {
    setCategories([])
    setSelectAllCities(false)
    setSelectedCategoryData([])
    setSelectedCategory("")
  }

  // selecting all states data
  const handleSelectAllCities = () => {
    const randomCityData = selectedStatesCityData[0]
    setCategories(
      Object?.keys(randomCityData)?.filter((key) => key !== "District")
    )
    setSelectAllCities(true)
  }

  // function to store the selected city in selectedCity
  // also creates dropdown options for categories
  const handleCityChange = (selectedCity: String) => {
    if (selectedCity === "ALL CITY") {
      return handleSelectAllCities()
    } else if (selectedCity === "CLEAR ALL SELECTION") {
      return handleClearSelected()
    }
    setSelectedCity(selectedCity)
    const filteredCityData = selectedStatesCityData?.find(
      (item) => item?.District === selectedCity
    )
    if (filteredCityData) {
      const categories = Object?.keys(filteredCityData)?.filter(
        (key) => key !== "District"
      )
      setCategories(categories)
    } else {
      setCategories([])
    }
  }

  // function to store the selected category in selectedCatogory
  const handleCategoryChange = (categorySelected: keyof CityData) => {
    setSelectedCategory(categorySelected)
  }

  // function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    color += "bb"
    return color
  }

  // Function to generate a unique random color that doesn't exist in selectedCategoryData
  function getUniqueRandomColor() {
    let randomColor: String = ""
    let isUnique = false

    while (!isUnique) {
      randomColor = getRandomColor()

      // Check if the generated color is unique
      isUnique = !selectedCategoryData.some(
        (category) => category.borderColor === randomColor
      )
    }

    return randomColor
  }

  // setting style for selected option
  const getOptionStyle = (item: String) => {
    const labelExists = selectedCategoryData.some(
      (category: DataSetInterface) => category.label === item?.toString()
    )
    return {
      ...(labelExists ? { backgroundColor: "black", color: "white" } : {}),
    }
  }

  // useEffect to set the data in the selectedCategoryData to pass as the yAxis parameter to the chart
  useEffect(() => {
    const handleCategoryChange = () => {
      //  selectedCity=the string && selectedCategory=the category
      if (selectedCity !== "" && selectedCategory !== "") {
        // selectedCityData = the data after finding the filtered city from seelcted city
        const selectedCityData: CityData | undefined =
          selectedStatesCityData?.find(
            (item) => item?.District === selectedCity
          )

        if (selectedCityData) {
          // categoryData = The category data for the particular category of that particular city
          const categoryData: String[] | String | undefined =
            selectedCityData[selectedCategory]

          if (categoryData !== undefined) {
            // categoryDataArray= The array of data of values of the selected category to be passed to the chart
            const categoryDataArray: String[] = Array?.isArray(categoryData)
              ? categoryData
              : [categoryData as String]

            const updatedCategoryData = Array.from(selectedCategoryData)

            const existingCity = updatedCategoryData?.find(
              (data) => data?.label === selectedCity
            )

            if (existingCity) {
              const filteredData = updatedCategoryData?.filter(
                (data) => data?.label !== selectedCity
              )
              setSelectedCategoryData(filteredData)
            } else {
              setSelectedCategoryData((prev) => [
                ...prev,
                {
                  data: categoryDataArray,
                  label: selectedCity,
                  borderColor: getUniqueRandomColor(),
                  backgroundColor: getUniqueRandomColor(),
                },
              ])
            }
          } else {
            setSelectedCategoryData([])
          }
        }
      } else {
        setSelectedCategoryData([])
      }
    }

    handleCategoryChange()
  }, [selectedStatesCityData, selectedCity, selectedCategory, availableStates])

  // useEffect when all states are selected
  useEffect(() => {
    const updatedCategoryDataWhenAllCitiesSelected = () => {
      if (selectAllCities && selectedCategory) {
        const copyOfSelectedStatesCityData = Array.from(selectedStatesCityData)
        const filteredCategoryWiseCityData = copyOfSelectedStatesCityData?.map(
          (data) => {
            return {
              [selectedCategory]: data[selectedCategory],
              District: data?.District,
            }
          }
        )
        const modifyAllData: any = filteredCategoryWiseCityData?.map((data) => {
          const dataArray = Array.isArray(data[selectedCategory])
            ? data[selectedCategory]
            : [data[selectedCategory]?.toString() || ""]

          return {
            data: dataArray,
            label: data?.District?.toString() || "",
            borderColor: getUniqueRandomColor(),
            backgroundColor: getUniqueRandomColor(),
          }
        })
        setSelectedCategoryData(modifyAllData)
      }
    }
    updatedCategoryDataWhenAllCitiesSelected()
  }, [selectAllCities, selectedCategory, selectedStatesCityData])

  // useEffect to get the quarterly data
  useEffect(() => {
    availableStates.length === 0 && dispatch(getDataQuarterly())
  }, [dispatch, availableStates])

  if (loading) return <Loader />

  return (
    <div className="p-10 min-h-screen">
      <div>
        {selectedCategoryData.length === 0 && (
          <div className="pb-10 h-fit flex justify-center items-center">
            <p className="text-2xl">Select the fields to view the data</p>
          </div>
        )}
        <div className="flex justify-evenly">
          <div className="w-[30%]">
            <select
              name="state"
              id="state"
              onChange={(e) => handleStateChange(e.target.value)}
              className="p-2 w-full rounded-md outline-none"
            >
              <option value="">Select the state</option>
              {availableStates &&
                availableStates.map((item: String, key: number) => (
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
              disabled={!availableCities.length}
              onChange={(e) => handleCityChange(e.target.value)}
              className="p-2 w-full rounded-md outline-none disabled:cursor-not-allowed"
            >
              <option value="">Select the city</option>
              <option
                style={{ backgroundColor: "green", color: "white" }}
                value="ALL CITY"
              >
                ALL CITIES
              </option>
              <option
                style={{ backgroundColor: "red", color: "white" }}
                value="CLEAR ALL SELECTION"
              >
                CLEAR ALL SELECTION
              </option>
              {availableCities &&
                availableCities.map((item: String, key: number) => (
                  <option
                    style={getOptionStyle(item)}
                    key={key}
                    value={item?.toString()}
                  >
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[30%]">
            <select
              name="cat"
              id="cat"
              disabled={!categories.length}
              onChange={(e) =>
                handleCategoryChange(e.target.value as keyof CityData)
              }
              className="p-2 w-full rounded-md outline-none disabled:cursor-not-allowed"
            >
              <option value="">Select the category</option>
              {categories &&
                categories.map((item: String, key: number) => (
                  <option key={key} value={item.toString()}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center w-full  flex-wrap">
          <div className="w-4/5">
            {selectedCategoryData.length !== 0 && (
              <FilledLinedCharts
                yAxisData={selectedCategoryData}
                category={selectedCategory}
                selectedState={selectedState}
                quarterly={quarterly}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
