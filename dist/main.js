const render = new Renderer()
const userManager = new UserManager()

const logInData = {
    id: "login",
    title: "Log In",
    prompt: "New to Friendster?",
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


const loadLogIn = () => {
    $('#container').empty()
    render.landingRenderer(logInData)
}


const loadSignUp = () => {
    $('#container').empty()
    render.landingRenderer(signUpData)
}

loadLogIn()


const loadProfile = (userData) => {
    $('#container').empty()
    console.log(userData)
    render.profileRenderer(userData)    
}

const logIn = async function () {
    let userData = {
        username: $("#user").val(),
        password: $("#password").val()
    }
    await userManager.getUserData(userData)
    loadProfile(userManager.user)
}

const signUp = function () {
    let userData = {
        username: $("#user").val(),
        password: $("#password").val(),
    }
    $.post('/register', userData, function () {
        loadLogIn()
    })
}






$('body').on('click', '#addFriend', async function () {
    // let username = $('.dashboard').attr('id')
    // console.log(username)
    let friend = $(this).closest('.user-row').find('.username').text()
 await   userManager.addFriend(friend)
    loadProfile(userManager.user)
})

$('body').on('click', '#unFriend', function () {
    let user = $(this).closest('.user-row').find('.username').text()
    console.log(`${user} removed from friends`)
})

