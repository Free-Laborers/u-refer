import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Toolbar, IconButton, Box, Tooltip } from "@mui/material";
import Link, { LinkProps } from "@mui/material/Link";
import Logo from "./Logo";
import useAuth from "../hooks/useAuth";
import { useHistory } from "react-router";

const TextLink = (props: LinkProps) => {
  return (
    <Link
      {...props}
      style={{ margin: "20px" }}
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
        <Box style={{ flex: 1 }}>
          <TextLink href="/jobs">Browse Jobs</TextLink>
          <TextLink href="/">Home</TextLink>
          <TextLink href="/profile">Profile</TextLink>
        </Box>
        <Tooltip title="Log Out">
          <IconButton
            style={{ float: "right" }}
            size="large"
            edge="end"
            onClick={handleLogout}
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
