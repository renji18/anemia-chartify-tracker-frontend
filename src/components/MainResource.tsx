"use client"

import { useEffect, useState } from "react"
import {
  CityData,
  DataItem,
  DataItemMonthly,
  DataItemObject,
  DataSetInterface,
  useAppDispatch,
  useAppSelector,
} from "@/utility/type"
import FilledLinedCharts from "@/components/FilledLineChart"
import Loader from "@/components/Loader"
import { getData } from "@/redux/actions"

type CityDataKey = keyof CityData | ""
type SelectedStatesCityDataItem =
  | DataItem["quarterly"]
  | DataItemMonthly["monthly"]

const MainResource = ({ resourceType }: { resourceType: String }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  // state data array for showing
  const [availableStates, setAvailableStates] = useState<String[]>([])
  // city data array for showing
  const [availableCities, setAvailableCities] = useState<String[]>([])
  // category data array for showing
  const [categories, setCategories] = useState<String[]>([])
  // year data array for showing
  const [years, setYears] = useState<String[]>([])

  // city data (quarterly/monthly)
  const [selectedStatesCityData, setSelectedStatesCityData] =
    useState<SelectedStatesCityDataItem>([])
  // category data
  const [selectedCityCategoryData, setSelectedCityCategoryData] =
    useState<DataItemObject["monthly"]>()

  // selected State string
  const [selectedState, setSelectedState] = useState<String | null>(null)

  // selected city string
  const [selectedCity, setSelectedCity] = useState<String | null>(null)

  // selected category
  const [selectedCategory, setSelectedCategory] = useState<CityDataKey>("")

  // selected year
  const [selectedYear, setSelectedYear] = useState<String>("")

  // y-axis data
  const [selectedCategoryData, setSelectedCategoryData] = useState<
    DataSetInterface[]
  >([])

  // selecting all cities
  const [selectAllCities, setSelectAllCities] = useState<Boolean>(false)

  // resource type
  const [resourceTypeState, setResourceTypeState] = useState([])
  const resource = useAppSelector((state: any) => state?.data)

  // useEffect to set resource type
  useEffect(() => {
    const setResource = () => {
      if (!resource) return
      if (resourceType === "quarterly") setResourceTypeState(resource.quarterly)
      else setResourceTypeState(resource.monthly)
    }
    setResource()
  }, [resource, resourceType])

  // useEffect to set all avaialbe states to show in the drop down
  useEffect(() => {
    setAvailableStates(
      resourceTypeState?.map((value: any) => value?.state?.toString()).sort() ||
        []
    )
  }, [resourceTypeState])

  // function to create the dropdown options for cities of the selected state in availableCities
  // also stores all the data of the selected state in selectedStatesCityData
  const handleStateChange = (selectedState: String) => {
    setSelectedCity(null)
    setCategories([])
    setSelectAllCities(false)
    setSelectedCategoryData([])
    setSelectedCategory("")
    setYears([])
    setSelectedYear("")
    setSelectedState(selectedState)
    const filteredStateData: any = resourceTypeState?.find(
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
    setYears([])
    setSelectedYear("")
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
    resourceType === "monthly" && setSelectedCityCategoryData(filteredCityData)
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
    if (resourceType === "quarterly") return
    if (selectedCityCategoryData && categorySelected) {
      const filteredCategoryData = selectedCityCategoryData[categorySelected]
      // setSelectedCategoryYearData(filteredCategoryData)
      const filteredYearData = Array.isArray(filteredCategoryData)
        ? filteredCategoryData?.map((item: any) => item.year)
        : []
      setYears(filteredYearData)
    } else {
      const randomCityData = selectedStatesCityData[0]
      const filteredCategoryData = randomCityData[categorySelected]
      // setSelectedCategoryYearData(filteredCategoryData)
      const filteredYearData = Array.isArray(filteredCategoryData)
        ? filteredCategoryData?.map((item: any) => item.year)
        : []
      setYears(filteredYearData)
    }
  }

  const handleYearChange = (yearSelected: String) => {
    if (resourceType === "quarterly") return
    setSelectedYear(yearSelected)
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

  // useEffect to set the data in the selectedCategoryData to pass as the yAxis parameter to the chart for QUARTERLY
  useEffect(() => {
    const handleCategoryChange = () => {
      if (resourceType === "monthly") return
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
  }, [selectedStatesCityData, selectedCity, selectedCategory])
  // for MONTHLY
  useEffect(() => {
    const handleCategoryChange = () => {
      if (resourceType === "quarterly") return
      //  selectedCity=the string && selectedCategory=the category
      if (
        selectedCity !== "" &&
        selectedCategory !== "" &&
        selectedYear !== ""
      ) {
        // selectedCityData = the data after finding the filtered city from seelcted city
        const selectedCityData: CityData | undefined =
          selectedStatesCityData?.find(
            (item) => item["District"] === selectedCity
          )

        if (selectedCityData) {
          // categoryData = The category data for the particular category of that particular city
          const categoryData: String[] | String | undefined =
            selectedCityData[selectedCategory]

          if (categoryData !== undefined) {
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
              const yearDataArray: any = Array.isArray(categoryData)
                ? categoryData?.find(
                    (item: any) => item.year === Number(selectedYear)
                  )
                : []

              setSelectedCategoryData((prev) => [
                ...prev,
                {
                  data: yearDataArray?.data,
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
  }, [selectedStatesCityData, selectedCity, selectedCategory, selectedYear])

  // useEffect when all states are selected for QUARTERLY
  useEffect(() => {
    const updatedCategoryDataWhenAllCitiesSelected = () => {
      if (resourceType === "monthly") return
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
            // backgroundColor: getUniqueRandomColor(),
          }
        })
        setSelectedCategoryData(modifyAllData)
      }
    }
    updatedCategoryDataWhenAllCitiesSelected()
  }, [selectAllCities, selectedCategory, selectedStatesCityData])
  // for MONTHLY
  useEffect(() => {
    const updatedCategoryDataWhenAllCitiesSelected = () => {
      if (resourceType === "quarterly") return
      if (selectAllCities && selectedCategory && selectedYear) {
        const copyOfSelectedStatesCityData = Array.from(selectedStatesCityData)
        const filteredCategoryWiseCityData = copyOfSelectedStatesCityData?.map(
          (data) => {
            return {
              [selectedCategory]: data[selectedCategory],
              District: data?.District,
            }
          }
        )

        const modifyAllData: any = filteredCategoryWiseCityData?.map(
          (data: any) => {
            const categoryForSelectedYear = data[selectedCategory]?.find(
              (cat: any) => cat.year === Number(selectedYear)
            )

            return {
              data: categoryForSelectedYear?.data,
              label: data?.District?.toString() || "",
              borderColor: getUniqueRandomColor(),
              // backgroundColor: getUniqueRandomColor(),
            }
          }
        )

        setSelectedCategoryData(modifyAllData)
      }
    }
    updatedCategoryDataWhenAllCitiesSelected()
  }, [selectAllCities, selectedCategory, selectedStatesCityData, selectedYear])

  // useEffect to get the quarterly data
  useEffect(() => {
    dispatch(getData({ typeOf: resourceType }))
  }, [])

  useEffect(() => {
    availableStates?.length !== 0 && setLoading(false)
  }, [availableStates])

  if (loading) return <Loader />

  return (
    <div className="p-10 min-h-screen">
      <div>
        {selectedCategoryData.length === 0 && (
          <div className="pb-10 h-fit flex justify-center items-center">
            <p className="text-2xl">Select the fields to view the data</p>
          </div>
        )}
        <div className={`flex gap-10 justify-evenly`}>
          <div className="flex-1">
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
          <div className="flex-1">
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
          <div className="flex-1">
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
                categories.map(
                  (item: String, key: number) =>
                    item !== "State Rank" && (
                      <option key={key} value={item.toString()}>
                        {item}
                      </option>
                    )
                )}
            </select>
          </div>
          {resourceType === "monthly" && (
            <div className="flex-1">
              <select
                name="year"
                id="year"
                disabled={!years?.length}
                onChange={(e) => handleYearChange(e.target.value)}
                className="p-2 w-full rounded-md outline-none disabled:cursor-not-allowed"
              >
                <option value="">Select the Year</option>
                {years &&
                  years.map((item: String, key: number) => (
                    <option key={key} value={item.toString()}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-full flex-wrap">
          <div className="w-4/5">
            {selectedCategoryData.length !== 0 && (
              <FilledLinedCharts
                yAxisData={selectedCategoryData}
                category={selectedCategory}
                selectedState={selectedState}
                dataSet={
                  resourceType === "quarterly"
                    ? resource?.quarterly
                    : resource?.monthly
                }
                type={resourceType === "quarterly" ? "quarterly" : "monthly"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainResource
