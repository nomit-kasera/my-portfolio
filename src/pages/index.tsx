import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Header from "./common/header/header";
import AboutMe from "./core/aboutme/aboutme";
import MyToolkit from "./core/mytoolkit/mytoolkit";

// const Container = styled.div``;
const theme = extendTheme({
  colors: 'black',
  
});
export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <AboutMe />
      <MyToolkit />
    </ChakraProvider>
  );
}
