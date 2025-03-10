"use client";

import Image from "next/image";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Providers from "./providers";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box as="html" lang="en">
      <Box as="body">
        <Providers>
          <Container maxW="container.xl" p={0}>
            <VStack spacing={6}>
              <Box position="relative" width="100%" height="300px">
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  height="100%"
                  width="100%"
                >
                  <Image
                    src="/portal.gif"
                    alt="Portal"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    priority
                  />
                </Box>
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  padding={4}
                  width="100%"
                >
                  <Heading
                    as="h1"
                    size="2xl"
                    textAlign="center"
                    data-cy="page-title"
                    className="portal-title"
                    fontFamily="'Get Schwifty', sans-serif"
                    color="mortyYellow.500"
                    textShadow="0 0 10px #97ce4c, 0 0 15px #97ce4c"
                  >
                    Rick n Morty
                  </Heading>
                </Box>
              </Box>
              <Text
                mx={4}
                textAlign="center"
                fontSize="lg"
                color="gray.300"
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
                Explore characters from across the multiverse. Don&apos;t get
                too attached Morty, they&apos;re just data from an API.
              </Text>
              {children}
              <Text
                textAlign="center"
                fontSize="sm"
                color="gray.500"
                mt={6}
                mb={10}
              >
                Powered by the Rick and Morty API - wubba lubba dub dub!
              </Text>
            </VStack>
          </Container>
        </Providers>
      </Box>
    </Box>
  );
};

export default Layout;
