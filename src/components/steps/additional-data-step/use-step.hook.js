import { useCallback, useMemo, useRef, useState } from "react"
import { useLanguage } from "../../../providers/language"
import { useRisk } from "../../../providers/risk"

export const useStep = () => {
  const { translatedContent: texts } = useLanguage()
  const { updateRisk } = useRisk()

  const [score2, setScore2] = useState()

  const age = useRef()
  const sbp = useRef()
  const dbp = useRef()
  const tc = useRef()
  const hdl = useRef()
  const ldl = useRef()
  const smoker = useRef()
  const sex = useRef()

  const score2op_table = useMemo(
    () => [
      [37, 39, 40, 42, 41, 43, 44, 46, 37, 45, 53, 62, 37, 45, 53, 61],
      [35, 36, 38, 39, 39, 40, 42, 43, 36, 43, 51, 59, 35, 43, 51, 59],
      [32, 34, 35, 37, 36, 38, 39, 41, 34, 41, 49, 57, 34, 41, 48, 57],
      [30, 32, 33, 34, 34, 35, 37, 38, 32, 39, 47, 55, 32, 39, 46, 55],
      [27, 28, 30, 31, 34, 35, 37, 39, 30, 35, 41, 47, 34, 40, 46, 53],
      [24, 25, 27, 28, 30, 32, 33, 35, 27, 32, 37, 43, 31, 36, 42, 48],
      [21, 22, 24, 25, 27, 28, 30, 31, 25, 29, 34, 40, 28, 33, 38, 44],
      [19, 20, 21, 22, 24, 25, 27, 28, 22, 26, 31, 36, 25, 30, 35, 40],
      [19, 20, 21, 23, 27, 29, 30, 32, 24, 27, 31, 35, 31, 35, 39, 44],
      [16, 17, 18, 19, 24, 25, 26, 28, 21, 23, 27, 30, 27, 30, 34, 38],
      [14, 15, 15, 16, 20, 21, 22, 24, 17, 20, 23, 26, 23, 26, 29, 33],
      [12, 12, 13, 14, 17, 18, 19, 20, 15, 17, 19, 22, 19, 22, 25, 29],
      [13, 14, 15, 16, 22, 23, 25, 26, 19, 21, 23, 25, 28, 31, 34, 36],
      [11, 11, 12, 13, 18, 19, 20, 22, 15, 17, 18, 20, 23, 25, 28, 30],
      [9, 9, 10, 11, 15, 16, 17, 18, 12, 13, 15, 16, 19, 20, 22, 24],
      [7, 7, 8, 8, 12, 13, 13, 14, 10, 11, 12, 13, 15, 16, 18, 20],
    ],
    []
  )

  const score2_table = useMemo(
    () => [
      [10, 10, 11, 12, 15, 16, 17, 18, 14, 15, 17, 18, 20, 22, 23, 25],
      [8, 9, 9, 9, 13, 13, 14, 15, 12, 13, 14, 15, 17, 18, 20, 21],
      [7, 7, 7, 8, 10, 11, 12, 12, 10, 11, 12, 13, 14, 15, 17, 18],
      [5, 6, 6, 6, 9, 9, 9, 10, 8, 9, 10, 10, 12, 13, 14, 15],
      [7, 8, 8, 9, 12, 13, 14, 15, 11, 12, 13, 15, 17, 18, 20, 22],
      [6, 6, 7, 7, 10, 11, 11, 12, 9, 10, 11, 12, 14, 15, 17, 18],
      [5, 5, 5, 6, 8, 8, 9, 10, 7, 8, 9, 10, 11, 13, 14, 15],
      [4, 4, 4, 5, 6, 7, 7, 8, 6, 7, 7, 8, 9, 10, 11, 12],
      [5, 6, 6, 7, 10, 11, 11, 12, 9, 10, 11, 12, 14, 16, 17, 20],
      [4, 4, 5, 5, 8, 8, 9, 10, 7, 8, 9, 10, 11, 13, 14, 16],
      [3, 3, 4, 4, 6, 7, 7, 8, 5, 6, 7, 8, 9, 10, 11, 13],
      [3, 3, 3, 3, 5, 5, 6, 6, 4, 5, 6, 6, 7, 8, 9, 10],
      [4, 4, 5, 5, 8, 8, 9, 10, 7, 8, 9, 10, 11, 13, 15, 17],
      [3, 3, 4, 4, 6, 6, 7, 8, 5, 6, 7, 8, 9, 10, 12, 14],
      [2, 2, 3, 3, 5, 5, 6, 6, 4, 5, 5, 6, 7, 8, 9, 11],
      [2, 2, 2, 2, 3, 4, 4, 5, 3, 4, 4, 5, 5, 6, 7, 8],
      [3, 3, 3, 4, 6, 7, 8, 9, 5, 6, 7, 8, 9, 11, 13, 15],
      [2, 2, 3, 3, 5, 5, 6, 6, 4, 5, 5, 6, 7, 8, 10, 12],
      [2, 2, 2, 2, 3, 4, 4, 5, 3, 4, 4, 5, 5, 7, 8, 9],
      [1, 1, 1, 2, 3, 3, 3, 4, 2, 3, 3, 4, 4, 5, 6, 7],
      [2, 2, 3, 3, 5, 5, 6, 7, 4, 5, 6, 7, 8, 9, 11, 13],
      [1, 2, 2, 2, 3, 4, 5, 5, 3, 4, 4, 5, 6, 7, 8, 10],
      [1, 1, 1, 2, 3, 3, 3, 4, 2, 3, 3, 4, 4, 5, 6, 8],
      [1, 1, 1, 1, 2, 2, 2, 3, 2, 2, 2, 3, 3, 4, 5, 6],
    ],
    []
  )

  const handleFormChange = useCallback(() => {
    const selectedAge = Number(age.current?.value)
    const selectedSbp = Number(sbp.current?.value)
    const selectedDbp = Number(dbp.current?.value)
    const selectedTc = Number(tc.current?.value)
    const selectedHdl = Number(hdl.current?.value)
    const selectedLdl = Number(ldl.current?.value)
    const isSmoker = smoker.current?.checked
    const selectedSex = sex.current?.value

    if (
      selectedAge > 0 &&
      selectedSbp > 0 &&
      selectedDbp > 0 &&
      selectedTc > 0 &&
      selectedHdl > 0 &&
      selectedLdl > 0
    ) {
      let cholesterolClass, sbpClass, ageClass, score2
      const nonHdl = selectedTc - selectedHdl

      if (nonHdl < 150) cholesterolClass = 1
      else if (nonHdl < 200) cholesterolClass = 2
      else if (nonHdl < 250) cholesterolClass = 3
      else cholesterolClass = 4

      if (selectedSbp <= 119) sbpClass = 4
      else if (selectedSbp <= 139) sbpClass = 3
      else if (selectedSbp <= 159) sbpClass = 2
      else if (selectedSbp <= 179) sbpClass = 1
      else sbpClass = 1

      if (selectedAge <= 44) ageClass = 6
      else if (selectedAge <= 49) ageClass = 5
      else if (selectedAge <= 54) ageClass = 4
      else if (selectedAge <= 59) ageClass = 3
      else if (selectedAge <= 64) ageClass = 2
      else if (selectedAge <= 69) ageClass = 1
      else if (selectedAge <= 74) ageClass = 4 // score2-op from here
      else if (selectedAge <= 79) ageClass = 3
      else if (selectedAge <= 84) ageClass = 2
      else ageClass = 1

      if (selectedAge <= 69) {
        if (selectedSex === "female") {
          score2 = isSmoker
            ? score2_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1 + 4
              ]
            : score2_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1
              ]
        } else {
          score2 = isSmoker
            ? score2_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1 + 12
              ]
            : score2_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1 + 8
              ]
        }
      } else {
        if (selectedSex === "female") {
          score2 = isSmoker
            ? score2op_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1 + 4
              ]
            : score2op_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1
              ]
        } else {
          score2 = isSmoker
            ? score2op_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1 + 12
              ]
            : score2op_table[sbpClass - 1 + (ageClass * 4 - 4)][
                cholesterolClass - 1 + 8
              ]
        }
      }

      if (
        (selectedAge < 50 && score2 >= 7.5) ||
        (selectedAge >= 50 && selectedAge < 70 && score2 >= 10) ||
        (selectedAge >= 70 && score2 >= 15)
      )
        updateRisk("additionalData", 4)
      else if (
        selectedTc > 310 ||
        selectedLdl > 190 ||
        selectedSbp >= 180 ||
        selectedDbp >= 110 ||
        (selectedAge < 50 && score2 >= 2.5 && score2 < 7.5) ||
        (selectedAge >= 50 && selectedAge < 70 && score2 >= 5 && score2 < 10) ||
        (selectedAge >= 70 && score2 >= 7.5 && score2 < 15)
      )
        updateRisk("additionalData", 3)
      else if (
        (selectedAge < 50 && score2 < 2.5) ||
        (selectedAge >= 50 && selectedAge < 70 && score2 < 5) ||
        (selectedAge >= 70 && score2 < 7.5)
      )
        updateRisk("additionalData", 2)
      else updateRisk("additionalData", 1)

      setScore2(score2)
    } else {
      setScore2(undefined)
      updateRisk("additionalData", 1)
    }
  }, [score2_table, score2op_table, updateRisk])

  return {
    age,
    sbp,
    dbp,
    tc,
    hdl,
    ldl,
    smoker,
    sex,
    texts,
    score2,
    handleFormChange,
  }
}
