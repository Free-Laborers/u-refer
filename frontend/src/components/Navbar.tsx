import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Toolbar, IconButton, Box, Tooltip, Typography } from "@mui/material";
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
  const { user, logout } = useAuth();

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
          <TextLink href="/profile">Profile</TextLink>
          {user?.isManager ? (
            <TextLink href="/jobs/create">Create A Job Post</TextLink>
          ) : null}
        </Box>
        <Typography sx={{ float: "right", mr: 2 }} variant="caption">
          Logged in as: {user ? `${user.firstName} ${user.lastName}` : null}
        </Typography>
        <Tooltip title="Log Out">
          <IconButton
            style={{ float: "right" }}
            size="large"
            edge="end"
            onClick={() => {
              logout();
              history.push('/login');
            }}
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
