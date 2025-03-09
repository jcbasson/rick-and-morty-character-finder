import { Button, Center, Heading, Text, Image } from "@chakra-ui/react";

interface ErrorProps {
  message: string;
  retry: () => void;
}
const Error = ({ message, retry }: ErrorProps) => (
  <Center flexDirection="column" h="50vh" data-cy="error-message">
    <Image src="/morty-panic.png" alt="Morty Panicking" height="150px" mb={4} />
    <Heading size="md" mb={4} color="red.500">
      Oh jeez! Something went wrong!
    </Heading>
    <Text mb={4} color="white">
      {message}
    </Text>
    <Button
      colorScheme="teal"
      onClick={retry}
      variant="rickStyle"
      leftIcon={<Image src="/portal-gun.png" alt="Portal Gun" height="20px" />}
    >
      Try Again
    </Button>
  </Center>
);

export default Error;
