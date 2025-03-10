import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";

interface PagerProps {
  pageNo: number;
  totalPages?: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  disablePrevPaging: boolean;
  disableNextPaging: boolean;
}

const Pager = ({
  pageNo,
  totalPages,
  handlePrevPage,
  handleNextPage,
  disablePrevPaging,
  disableNextPaging,
}: PagerProps) => {
  return (
    <Flex
      mb={8}
      justifyContent="center"
      alignItems="center"
      bg="space.600"
      p={4}
      borderRadius="lg"
      borderWidth="2px"
      borderColor="portalGreen.500"
      maxW="md"
      mx="auto"
    >
      <HStack spacing={4}>
        <Button
          onClick={handlePrevPage}
          isDisabled={disablePrevPaging}
          variant="rickStyle"
          data-cy="prev-page"
          leftIcon={<Box as="span">👈</Box>}
        >
          Previous
        </Button>
        <Text
          data-cy="page-indicator"
          px={4}
          py={2}
          borderRadius="md"
          bg="space.700"
          color="portalGreen.500"
          fontWeight="bold"
        >
          {pageNo} / {totalPages || "?"}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={disableNextPaging}
          variant="rickStyle"
          data-cy="next-page"
          rightIcon={<Box as="span">👉</Box>}
        >
          Next
        </Button>
      </HStack>
    </Flex>
  );
};

export default Pager;
