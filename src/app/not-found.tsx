import { Box } from "@chakra-ui/react";
import Image from "next/image";

const NotFound = () => {
  return (
    <Box display="flex" flexDirection="column" gap="16px" alignItems="center">
      <h1>Not found</h1>

      <Image
        src="/notfound.gif"
        alt="Not Found"
        width={444}
        height={250}
        style={{
          objectFit: "cover",
          borderRadius: "339px",
        }}
        priority
      />
    </Box>
  );
};

export default NotFound;
