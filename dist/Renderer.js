class Renderer{
    constructor(){}

    landingRenderer(landingData){
        let source = $('#landing-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(landingData);
        $('#container').append(newHTML);  
    }

    profileRenderer(userData){
        let source = $('#profile-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(userData);
        $('#container').append(newHTML);  
    }
}