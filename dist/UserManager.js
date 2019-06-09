class UserManager {
    constructor() {
        this.user = {
            username: '',
            numLogIns: '',
            first: true
        }
    }
    toProperCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    async getUserData(userInput) {
        await $.post(`/login`, userInput)
        let userData = await $.get('/dashboard')
        this.user.username = this.toProperCase(userData.username)
        this.user.numLogIns = userData.numLogIns++
        this.user.numLogIns > 1 ? this.user.first = false : true
        console.log(this.user)
        $.ajax({
                    method: "PUT",
                    url: `/update/${this.user.username.toLowerCase()}`,
                    success: function (userData) {
                        console.log(userData)
                    }
                })
    }



}


