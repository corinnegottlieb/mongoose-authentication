const render = new Renderer()
const userManager = new UserManager()

const logInData = {
    id: "login",
    title: "Log In",
    prompt: "New to Bambooster?",
    promptFunction: 'loadSignUp()',
    promptButton: "Sign Up",
    functionName: "logIn()",
}

const signUpData = {
    id: "signup",
    title: "Sign Up",
    prompt: "Already have an account?",
    promptFunction: "loadLogIn()",
    promptButton: "Log In",
    functionName: "signUp()",
}

const loadProfile = (userData) => {
    $('#container').empty()
    console.log(userData)
    render.profileRenderer(userData)    
}
const loadLogIn = () => {
    $('#container').empty()
    // userManager.user.username.length > 0 ? loadProfile(userManager.user) :
    render.landingRenderer(logInData)
}

const loadSignUp = () => {
    $('#container').empty()
    render.landingRenderer(signUpData)
}

const checkLoggedIn = async () => {
  let session =  await $.get('/checkSession')
  console.log(session)
  session.session ? loadProfile() : loadLogIn()
}

checkLoggedIn()

const signUp = function () {
    let userInput = {
        username: $("#user").val(),
        password: $("#password").val()
    }
    $.post('/register', userInput, function () {
        loadLogIn()
    })
}


const logIn = async function () {
    let userInput = {
        username: $("#user").val(),
        password: $("#password").val()
    }
    await userManager.getUserData(userInput)
    loadProfile(userManager.user)
}

const logOut = async function () {
 $.get('/logout')
loadLogIn()
}
