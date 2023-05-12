import { IdiomaContext } from "contexts/IdiomaContext";
import { useContext } from "react";

const useIdiomaContext = () => {
  const context = useContext(IdiomaContext);
  if (!context)
    throw new Error(
      "useIdiomaContext debe estar dentro del proveedor IdiomaContext"
    );
  return context;
};

export default useIdiomaContext;
