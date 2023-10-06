"use client"

import { useEffect, useState } from "react"
import {
  CityData,
  DataItem,
  useAppDispatch,
  useAppSelector,
} from "@/utility/type"
import FilledLinedCharts from "@/components/FilledLineChart"
import Loader from "@/components/Loader"

type CityDataKey = keyof CityData | ""

export default function Home() {
  const dispatch = useAppDispatch()
  // const [loading, setLoading] = useState<boolean>(true)
  const [state, setState] = useState<String[]>([])
  const [cityData, setCityData] = useState<DataItem["quarterly"]>([])
  const [city, setCity] = useState<String[]>([])
  const [cat, setCat] = useState<String[]>([])
  const [selectedCat, setSelectedCat] = useState<CityDataKey>("")
  const [selectedCategoryData, setSelectedCategoryData] = useState<String[]>([])
  const [selectedCity, setSelectedCity] = useState<String | null>(null)

  const { quarterly }: DataItem = useAppSelector((state: any) => state?.data)
  const { loading } = useAppSelector((state) => state?.loader)

  useEffect(() => {
    setState(
      quarterly?.map((value: any) => value?.state?.toString()).sort() || []
    )
  }, [quarterly])

  const handleStateChange = (selectedState: String) => {
    setSelectedCity(null)
    const selectedData: any = quarterly.find(
      (item: any) => item.state === selectedState
    )
    if (selectedData) {
      setCityData(selectedData.data)
      setCity(selectedData.data.map((item: CityData) => item.District).sort())
    } else {
      setCity([])
      setCityData([])
    }
  }

  const handleCityChange = (selectedCity: String) => {
    setSelectedCity(selectedCity)
    const selectedData = cityData.find((item) => item.District === selectedCity)

    if (selectedData) {
      const catKeys = Object.keys(selectedData).filter(
        (key) => key !== "District"
      )
      setCat(catKeys)
    } else {
      setCat([])
    }
  }

  const handleCatChange = (selectedCat: keyof CityData) => {
    setSelectedCat(selectedCat)
  }

  useEffect(() => {
    const handleCategoryChange = () => {
      if (selectedCity && selectedCat !== "") {
        const selectedCityData: CityData | undefined = cityData.find(
          (item) => item.District === selectedCity
        )

        if (selectedCityData) {
          const categoryData: String[] | String | undefined =
            selectedCityData[selectedCat]

          if (categoryData !== undefined) {
            const categoryDataArray: String[] = Array.isArray(categoryData)
              ? categoryData
              : [categoryData]
            setSelectedCategoryData(categoryDataArray)
          } else {
            setSelectedCategoryData([])
          }
        }
      } else {
        setSelectedCategoryData([])
      }
    }

    handleCategoryChange()
  }, [cityData, selectedCity, selectedCat, state])

  if (loading) return <Loader />

  return (
    <div className="p-10 min-h-screen">
      <div>
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
              onChange={(e) =>
                handleCatChange(e.target.value as keyof CityData)
              }
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
            {selectedCategoryData.length === 0 ? (
              <div className="py-20 h-fit flex justify-center items-center">
                <p className="text-2xl">Select the fields to view the data</p>
              </div>
            ) : (
              <FilledLinedCharts
                yAxisData={selectedCategoryData}
                cat={selectedCat}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
