"use client";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "green.200",
        backgroundImage: "url('/portal-bg.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundColor: "background",
      },
      html: {
        backgroundColor: "background",
      },
    },
  },
  colors: {
    background: "#010000",
    brand: {
      500: "#97ce4c", // Rick's portal green
    },
    rickBlue: {
      500: "#24b2cc", // Rick's hair color
    },
    mortyYellow: {
      500: "#fafd7c", // Morty's shirt color
    },
    portalGreen: {
      500: "#3bec97", // Portal color
      600: "#32a674",
    },
    space: {
      500: "#1f2937", // Dark space color for cards
      600: "#151e29",
      700: "#0d131c",
    },
  },
  components: {
    Button: {
      variants: {
        rickStyle: {
          bg: "rickBlue.500",
          color: "white",
          _hover: {
            bg: "#1ca4c0",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "portalGreen.500",
        fontFamily: "'Get Schwifty', sans-serif",
      },
    },
  },
});

export default theme;
