// pages/index.tsx
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rick and Morty Character Portal</title>
        <meta
          name="description"
          content="Explore Rick and Morty characters from across the multiverse"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" py={8}>
        <Container maxW="container.xl">
          <VStack spacing={6} align="stretch" mb={12}>
            {/* Header with portal effect */}
            <Flex
              justifyContent="center"
              position="relative"
              h="180px"
              alignItems="center"
              mb={8}
            >
              <Image
                src="/portal.gif"
                alt="Portal"
                position="absolute"
                height="180px"
                zIndex={0}
              />

              <Flex direction="column" alignItems="center" zIndex={1}>
                <Heading
                  as="h1"
                  size="2xl"
                  textAlign="center"
                  data-cy="page-title"
                  className="portal-title"
                  fontFamily="'Get Schwifty', sans-serif"
                  color="mortyYellow.500"
                  textShadow="0 0 10px #97ce4c, 0 0 15px #97ce4c"
                  mb={2}
                >
                  Rick and Morty
                </Heading>
                <Heading
                  as="h2"
                  size="lg"
                  textAlign="center"
                  color="portalGreen.500"
                  textShadow="0 0 5px #3bec97"
                >
                  Multidimensional Character Database
                </Heading>
              </Flex>
            </Flex>

            <Text
              textAlign="center"
              fontSize="lg"
              color="gray.300"
              maxW="container.md"
              mx="auto"
              px={4}
              py={3}
              borderRadius="md"
              bg="space.600"
              borderWidth="1px"
              borderColor="portalGreen.500"
            >
              <Box as="span" color="portalGreen.500" fontWeight="bold">
                *burp*
              </Box>{" "}
              Explore characters from across the multiverse. Don&apos;t get too
              attached Morty, they&apos;re just data from an API.
            </Text>
          </VStack>

          <Text textAlign="center" fontSize="sm" color="gray.500" mt={10}>
            Powered by the Rick and Morty API - wubba lubba dub dub!
          </Text>
        </Container>
      </Box>
    </>
  );
}
