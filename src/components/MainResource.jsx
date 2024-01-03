"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/utility/type"
import FilledLinedCharts from "@/components/FilledLineChart"
import Loader from "@/components/Loader"
import { getData } from "@/redux/actions"

const MainResource = ({ resourceType }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  // state data array for showing
  const [availableStates, setAvailableStates] = useState([])
  // city data array for showing
  const [availableCities, setAvailableCities] = useState([])
  // category data array for showing
  const [categories, setCategories] = useState([])
  // year data array for showing
  const [years, setYears] = useState([])

  // city data (quarterly/monthly)
  const [selectedStatesCityData, setSelectedStatesCityData] = useState([])
  // category data
  const [selectedCityCategoryData, setSelectedCityCategoryData] = useState()

  // selected State string
  const [selectedState, setSelectedState] = useState(null)

  // selected city string
  const [selectedCity, setSelectedCity] = useState(null)

  // selected category
  const [selectedCategory, setSelectedCategory] = useState("")

  // selected year
  const [selectedYear, setSelectedYear] = useState("")

  // y-axis data
  const [selectedCategoryData, setSelectedCategoryData] = useState([])

  // selecting all cities
  const [selectAllCities, setSelectAllCities] = useState(false)

  // resource type
  const [resourceTypeState, setResourceTypeState] = useState([])
  const resource = useAppSelector((state) => state?.data)

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
      resourceTypeState?.map((value) => value?.state?.toString()).sort() || []
    )
  }, [resourceTypeState])

  // function to create the dropdown options for cities of the selected state in availableCities
  // also stores all the data of the selected state in selectedStatesCityData
  const handleStateChange = (selectedState) => {
    setSelectedCity(null)
    setCategories([])
    setSelectAllCities(false)
    setSelectedCategoryData([])
    setSelectedCategory("")
    setYears([])
    setSelectedYear("")
    setSelectedState(selectedState)
    const filteredStateData = resourceTypeState?.find(
      (item) => item?.state === selectedState
    )
    if (filteredStateData) {
      setSelectedStatesCityData(filteredStateData?.data)
      setAvailableCities(
        filteredStateData?.data?.map((item) => item?.District)?.sort()
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
  const handleCityChange = (selectedCity) => {
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
  const handleCategoryChange = (categorySelected) => {
    setSelectedCategory(categorySelected)
    if (resourceType === "quarterly") return
    if (selectedCityCategoryData && categorySelected) {
      const filteredCategoryData = selectedCityCategoryData[categorySelected]
      // setSelectedCategoryYearData(filteredCategoryData)
      const filteredYearData = Array.isArray(filteredCategoryData)
        ? filteredCategoryData?.map((item) => item.year)
        : []
      setYears(filteredYearData)
    } else {
      const randomCityData = selectedStatesCityData[0]
      const filteredCategoryData = randomCityData[categorySelected]
      // setSelectedCategoryYearData(filteredCategoryData)
      const filteredYearData = Array.isArray(filteredCategoryData)
        ? filteredCategoryData?.map((item) => item.year)
        : []
      setYears(filteredYearData)
    }
  }

  const handleYearChange = (yearSelected) => {
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
    let randomColor = ""
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
  const getOptionStyle = (item) => {
    const labelExists = selectedCategoryData.some(
      (category) => category.label === item?.toString()
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
        const selectedCityData = selectedStatesCityData?.find(
          (item) => item?.District === selectedCity
        )

        if (selectedCityData) {
          // categoryData = The category data for the particular category of that particular city
          const categoryData = selectedCityData[selectedCategory]

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
              setSelectedCategoryData((prev) => [
                ...prev,
                {
                  data: categoryData,
                  label: selectedCity,
                  borderColor: getUniqueRandomColor(),
                  backgroundColor: getUniqueRandomColor(),
                },
              ])
            }
            setSelectedCity(null)
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
        const selectedCityData = selectedStatesCityData?.find(
          (item) => item["District"] === selectedCity
        )

        if (selectedCityData) {
          // categoryData = The category data for the particular category of that particular city
          const categoryData = selectedCityData[selectedCategory]

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
              const yearDataArray = categoryData?.find(
                (item) => item.year === Number(selectedYear)
              )

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

            setSelectedCity(null)
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
        const modifyAllData = filteredCategoryWiseCityData?.map((data) => {
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

        const modifyAllData = filteredCategoryWiseCityData?.map((data) => {
          const categoryForSelectedYear = data[selectedCategory]?.find(
            (cat) => cat.year === Number(selectedYear)
          )

          return {
            data: categoryForSelectedYear?.data,
            label: data?.District?.toString() || "",
            borderColor: getUniqueRandomColor(),
            // backgroundColor: getUniqueRandomColor(),
          }
        })

        setSelectedCategoryData(modifyAllData)
      }
    }
    updatedCategoryDataWhenAllCitiesSelected()
  }, [selectAllCities, selectedCategory, selectedStatesCityData, selectedYear])

  // useEffect for changing category for QUARTERLY
  useEffect(() => {
    const handleUpdatingValueForCategoryChange = () => {
      if (resourceType === "monthly") return
      if (selectedCategoryData?.length === 0) return
      const selectedCitiesData = Array.from(selectedCategoryData).map(
        (catData) => {
          const cityData = selectedStatesCityData?.find(
            (item) => item?.District === catData?.label
          )
          return {
            data: cityData[selectedCategory],
            label: catData?.label,
            borderColor: catData?.borderColor,
            backgroundColor: catData?.backgroundColor,
          }
        }
      )

      setSelectedCategoryData(selectedCitiesData)
    }
    handleUpdatingValueForCategoryChange()
  }, [selectedCategory, resourceType])
  // for MONTHLY
  useEffect(() => {
    const handleUpdatingValueForCategoryChange = () => {
      if (resourceType === "quarterly") return
      if (selectedCategoryData?.length === 0) return
      const selectedCitiesData = Array.from(selectedCategoryData).map(
        (catData) => {
          const cityData = selectedStatesCityData?.find(
            (item) => item?.District === catData?.label
          )
          const categoryData = cityData[selectedCategory].filter(
            (catData) => catData?.year === Number(selectedYear)
          )[0]

          return {
            data: categoryData["data"],
            label: catData?.label,
            borderColor: catData?.borderColor,
            backgroundColor: catData?.backgroundColor,
          }
        }
      )
      setSelectedCategoryData(selectedCitiesData)
    }
    handleUpdatingValueForCategoryChange()
  }, [selectedCategory, resourceType, selectedYear])

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
                availableStates.map((item, key) => (
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
                availableCities.map((item, key) => (
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
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="p-2 w-full rounded-md outline-none disabled:cursor-not-allowed"
            >
              <option value="">Select the category</option>
              {categories &&
                categories.map(
                  (item, key) =>
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
                  years.map((item, key) => (
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
