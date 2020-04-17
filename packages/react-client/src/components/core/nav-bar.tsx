import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { RouteComponentProps, Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { Button, IconButton } from '@material-ui/core'
import { getAppCredential, setAppCredential } from '../../config/accessToken'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useLogoutMutation } from '../../graphql'

const Logout: React.FC<RouteComponentProps> = (props) => {
  const [logout, {client}] = useLogoutMutation()
  return (
    <MenuItem
      onClick={async () => {
        await logout()
        setAppCredential({
          id: '',
          accessToken: '',
          email: '',
          role: '',
          name: '',
        })
        client?.resetStore()
        props.history.push('/login')
      }}
    >
      Logout
    </MenuItem>
  )
}

const styles = (theme: any) => ({
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.primary,
  },
  toolbar: {
    background: theme.palette.background.primary,
  },
  textColorSecondary: {
    color: 'white',
  },
  tabItem: {
    width: '80px',
    minWidth: theme.spacing(0),
    textTransform: 'none',
    color: 'white',
  },
})
type Props = WithStyles & RouteComponentProps
interface State {
  tab: string
  anchorEl: any
}
class NavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      tab: '',
      anchorEl: null,
    }
  }

  handleChange = (_event: any, tab: any) => {
    this.setState({ tab })
    switch (tab) {
      case 'user':
        this.props.history.push('/users')
        break
      case 'post':
        this.props.history.push('/posts')
        break
      default:
        this.props.history.push('/')
        break
    }
  }

  handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  render() {
    const { classes } = this.props
    const { tab, anchorEl } = this.state
    const open = Boolean(anchorEl)
    const { email, name } = getAppCredential()
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Link to="/">
                <HomeIcon />
              </Link>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {name && (
                <>
                  <Tabs
                    value={tab}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab
                        fullWidth
                        icon={<HomeIcon />}
                      label="Home"
                      value="home"
                      className={classes.tabItem}
                    />
                    <Tab
                      label="Users"
                      value="user"
                      className={classes.tabItem}
                    />

                    <Tab
                      label="Posts"
                      value="post"
                      className={classes.tabItem}
                    />
                  </Tabs>
                </>
              )}
            </Typography>
            {!name && (
              <>
                <Link to="/login">
                  <Button style={{ textTransform: 'none' }}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button style={{ textTransform: 'none' }}>Register</Button>
                </Link>
              </>
            )}
            {name && (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  {name}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                    <Link to="/user/profile" style={{ textTransform: 'none' }}>
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>{email}</MenuItem>
                  <Logout {...this.props}/>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles as any)(NavBar)