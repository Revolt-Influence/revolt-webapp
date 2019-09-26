function getColorByBgColor(background: string): string {
  return parseInt(background.replace('#', ''), 16) > 0xffffff / 2
    ? palette.grey._900
    : palette.grey._50
}

function hexToRGBA(hex: string, alpha: number): string {
  // Works with 6-char hex codes with a hash
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export type paletteColorName = 'blue' | 'pink' | 'red' | 'orange' | 'green' | 'grey'

const palette = {
  // Blue tones (for brands)
  blue: {
    _100: '#F2F5FD',
    _200: '#E5EBFB',
    _300: '#C7D8F9',
    _400: '#99B6FA',
    _500: '#5C82F7',
    _600: '#3460E5',
    _700: '#1C48D9',
    _800: '#0A33C8',
    _900: '#06229D',
  },
  // Pink tones (for influencers)
  pink: {
    _100: '#FDF2F2',
    _200: '#FCDFDF',
    _300: '#F9B8B8',
    _400: '#F58989',
    _500: '#E96868',
    _600: '#C85155',
    _700: '#B33741',
    _800: '#97213C',
    _900: '#6D0328',
  },
  // Red tones (for errors and destructive actions)
  red: {
    _100: '#FDF1F2',
    _200: '#F4DCDC',
    _300: '#E49FA1',
    _400: '#E06364',
    _500: '#D93031',
    _600: '#C62524',
    _700: '#9D1515',
    _800: '#7F1B1A',
    _900: '#601919',
  },
  // Orange tones (for warnings)
  orange: {
    _100: '#FFFCE1',
    _200: '#FCF4B0',
    _300: '#F5E475',
    _400: '#ECCB27',
    _500: '#F2B349',
    _600: '#CF892D',
    _700: '#A46926',
    _800: '#82491E',
    _900: '#6E3113',
  },
  // Green tones (for success messages)
  green: {
    _100: '#EFFBF6',
    _200: '#D7F5EA',
    _300: '#A1DAC5',
    _400: '#74D99F',
    _500: '#38C271',
    _600: '#32AE66',
    _700: '#249D58',
    _800: '#197741',
    _900: '#0A4933',
  },
  // Grey tones (from white to black)
  grey: {
    _50: '#fefeff',
    _100: '#F9FAFB',
    _200: '#F1F2F4',
    _300: '#D8DEE3',
    _400: '#B7C0C8',
    _500: '#8795A1',
    _600: '#70818F',
    _700: '#606F7B',
    _800: '#4D5A66',
    _900: '#39424C',
  },
}

export { getColorByBgColor, hexToRGBA, palette }
