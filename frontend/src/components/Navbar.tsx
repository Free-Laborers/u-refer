import { AppBar, Toolbar, Box, Button, Grid } from "@mui/material";
import Link, { LinkProps } from "@mui/material/Link";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router";

const TextLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      style={{ margin: "16px" }}
      underline="none"
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

  return (
    <AppBar
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      position="fixed"
    >
      <Toolbar>
        <Logo color="white" style={{ marginRight: "100px" }} />
        {/* Main Links */}
        <Grid>
          <TextLink href="/jobs">Browse Jobs</TextLink>
          <TextLink href="/">Home</TextLink>
          <TextLink href="/profile">Profile</TextLink>
          <Button
            style={{
              float: "right",
            }}
            onClick={handleLogout}
            color="inherit"
          >
            Logout
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
