import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const FormButton = ({
  isLoading,
  btnName,
}: {
  isLoading: boolean;
  btnName: string;
}) => {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      className="w-full mt-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait...
        </>
      ) : (
        btnName
      )}
    </Button>
  );
};
export { FormButton };
