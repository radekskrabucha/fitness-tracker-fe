export const getCurrentYear = () => new Date().getFullYear()

export const getInitialDateValue = (dateRaw: string) => {
  const dateFrom = new Date(dateRaw)

  return `${dateFrom.getUTCFullYear()}-${dateFrom.getUTCMonth() + 1}-${dateFrom.getUTCDate()}`
}

export const calculateAge = (dateString: string): number => {
  const birthDate = new Date(dateString)

  if (isNaN(birthDate.getTime())) {
    throw new Error('Invalid date string')
  }

  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  const hasHadBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate())

  if (!hasHadBirthday) {
    age--
  }

  return age
}
