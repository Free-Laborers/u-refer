import { AppBar, Toolbar, Box } from "@mui/material";
import Link, { LinkProps } from "@mui/material/Link";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router";

const TextLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      style={{ margin: "16px" }}
      underline="hover"
      color="inherit"
    />
  );
};

export default function Navbar() {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };
  const handleProfile = () => {
    history.push("/profile");
  };

  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      position="fixed"
    >
      <Toolbar>
        <Logo color="white" style={{ marginRight: "100px" }} />
        {/* Main Links */}
        <Box style={{ flex: 1 }}>
          <TextLink href="/jobs">Browse Jobs</TextLink>
          <TextLink href="/">Home</TextLink>
          <TextLink onClick={handleProfile}>Profile</TextLink>
          <TextLink onClick={handleLogout}>Logout</TextLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
