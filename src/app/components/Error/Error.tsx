"use client";

import { Button, Center, Heading, Text } from "@chakra-ui/react";

interface ErrorProps {
  message: string;
  retry: () => void;
}
const Error = ({ message, retry }: ErrorProps) => (
  <Center
    display="flex"
    flexDirection="column"
    width="100%"
    alignSelf="center"
    data-cy="error-message"
  >
    <Heading size="md" mb={4} color="red.500">
      Oh jeez! Something went wrong!
    </Heading>
    <Text mb={4} color="white">
      {message}
    </Text>
    <Button
      backgroundColor="white"
      color="black"
      onClick={retry}
      variant="rickStyle"
    >
      Try Again
    </Button>
  </Center>
);

export default Error;
