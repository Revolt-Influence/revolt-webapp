import { Gender, AgeGroup } from '../__generated__/globalTypes'

export function showGender(gender: Gender): string {
  switch (gender) {
    case Gender.ANY:
      return 'Any'
    case Gender.MALE:
      return 'Males'
    case Gender.FEMALE:
      return 'Females'
    default:
      return gender
  }
}

export function showAgeGroup(ageGroup: AgeGroup): string {
  switch (ageGroup) {
    case AgeGroup.AGE_13_17:
      return '13-17'
    case AgeGroup.AGE_18_24:
      return '18-24'
    case AgeGroup.AGE_25_34:
      return '25-34'
    case AgeGroup.AGE_35_44:
      return '35-44'
    case AgeGroup.AGE_45_54:
      return '45-54'
    case AgeGroup.AGE_55_64:
      return '55-64'
    case AgeGroup.AGE_65_PLUS:
      return '65+'
    case AgeGroup.ANY:
      return 'any'
  }
}
