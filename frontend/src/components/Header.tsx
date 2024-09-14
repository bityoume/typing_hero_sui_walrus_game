import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Upload",
    link: "/upload",
  },
  {
    title: "Typing",
    link: "/typing",
  },
];

const Header = () => {
  return (
    <Container>
      <Flex
        position="sticky"
        top="0"
        px="4"
        py="2"
        justify="between"
        className="border-b flex flex-wrap"
      >
        <Box>
          <Heading className="flex items-center gap-3">Typing Hero</Heading>
        </Box>

        <Box className="flex gap-5 items-center">
          {menu.map((item) => (
            <Box key={item.link} className="flex justify-center">
              <NavLink
                key={item.link}
                to={item.link}
                className={({ isActive, isPending }) =>
                  `cursor-pointer flex items-center gap-2 ${
                    isPending
                      ? "pending"
                      : isActive
                        ? "font-bold text-blue-600"
                        : ""
                  }`
                }
              >
                {item.title}
              </NavLink>
            </Box>
          ))}
        </Box>

        <Box className="connect-wallet-wrapper">
          <ConnectButton />
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
