import AlgebraImage from "../../../assets/abacus.png";
import FunctionsImage from "../../../assets/function.png";
import GeometryImage from "../../../assets/geometry.png";
import ProbabilityImage from "../../../assets/rubik.png";
import ComplexNumbersImage from "../../../assets/calculator.png";
import TrigonometryImage from "../../../assets/sinus.png";
import CombinatoricsImage from "../../../assets/smilling_calculator.png";
import ExponentialAndLogarithmicFunctionsImage from "../../../assets/logarithm.png";
import SequencesImage from "../../../assets/cube.png";
import ExercisesImage from "../../..//assets/education_2.png";

const TopicImages: Record<string, string> = {
  "Cálculo Algébrico": AlgebraImage,
  "Geometria": GeometryImage,
  "Combinatória e Probabilidades": ProbabilityImage,
  "Funções": FunctionsImage,
  "Trigonometria": TrigonometryImage,
  "Funções exponenciais e funções logarítmicas": ExponentialAndLogarithmicFunctionsImage,
  "Números Complexos": ComplexNumbersImage,
  "Estatística": CombinatoricsImage,
  "Sucessões": SequencesImage,
  "Default": ExercisesImage
};

export default TopicImages;