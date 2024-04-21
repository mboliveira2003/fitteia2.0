import Year10Image from "/src/assets/cone.png";
import Year11Image from "/src/assets/math.png";
import Year12Image from "/src/assets/maths.png";



interface YearDisplayInfo {
  name: string;
  image: string;
}

const YearInfo: Record<string, YearDisplayInfo> = {
  "10": {
    name: "Matemática 10º",
    image: Year10Image,
  },
  "11": {
    name: "Matemática 11º",
    image: Year11Image,
  },
  "12": {
    name: "Matemática 12º",
    image: Year12Image,
  },
};

export default YearInfo;
