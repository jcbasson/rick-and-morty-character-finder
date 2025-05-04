"use client";

import Image from "next/image";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Providers from "./providers";
import Link from "next/link";
import { ROUTES } from "./constants/routes";

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
                    src="/portal.png"
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
                  <Link
                    href={ROUTES.RICK_N_MORTY_CHARACTERS}
                    style={{ textDecoration: "none" }}
                  >
                    <Heading
                      as="h1"
                      size="2xl"
                      textAlign="center"
                      data-cy="page-title"
                      className="portal-title"
                      fontFamily="'Get Schwifty', sans-serif"
                      color="mortyYellow.500"
                      textShadow={`0 0 10px #97ce4c, 0 0 15px #97ce4c`}
                    >
                      Rick n Morty Character Finder
                    </Heading>
                  </Link>
                </Box>
              </Box>

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
