import { Box, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box as="header" bg="teal.500" p={4}>
      <Heading color="black">My Header</Heading>
    </Box>
  );
}
