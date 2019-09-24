/* ************REGISTER************ */


function getData(){
    /* Crear Objeto */
    let registro = {}
    //location.reload(); /* Recargar página para envío de un solo objeto *
    
    /* Asignar valor a cada Variable */
    let name = document.getElementById("name").value
    let lastame = document.getElementById("lastname").value
    let email = document.getElementById("email").value
    let pass = document.getElementById("pass").value
    let cel = document.getElementById("cel").value
    /* Almacenar  Objeto*/
    
    registro = {
        name,
        lastame,
        email,
        pass,
        cel
    }

    console.log(registro)
 
    validateData(registro)
}

function validateData(data){
    error.innerHTML = ''
    /*Validaciones Con Expresiones Regulares REGEX */
    
    let validated = false

    /* Validación Nombre */
    if(data.name == null || data.name ==""){
        messageError('Nombre es un campo requerido')
        validated = false
    } else if (!/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/ .test(data.name)){
        messageError('Nombre incorrecto, solo se admiten caracteres')
        validated = false
    }  else if(data.name.length <= 3){
        messageError('El nombre requiere un minimo de 3 caracteres')
        validated = false
    }else{
        validated = true
    }

    /* Validación Apellido */

    if(data.lastame == null || data.lastame ==""){
        messageError('Apellido es un campo requerido')
        validated = false
    } else if (!/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/ .test(data.lastame)){
        messageError('Campo apellido incorrecto, solo se admiten caracteres')
        validated = false
    }  else if(data.lastame.length <= 3){
        messageError('El campo apellido requiere un minimo de 3 caracteres')
        validated = false
    }else{
        validated = true
    }


    /* Validación Correo */

    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if(data.email == null || data.email ==""){
        messageError('Email es un campo requerido')
        validated = false
    }else if (!emailRegex.test(data.email) && data.email!="") {
        messageError('El correo ingresado no es correcto')
        validated = false 
    }else{
        validated = true
    }

     /* Validación contraseña */
    if (data.pass == null || data.pass =="") {
        messageError('Contraseña es un campo requerido')
        validated = false
        console.log("contraseña" , validated);
    }else{
        validated = true
    }
    if(data.pass.length <= 5){
        messageError('La contraseña requiere un minimo de 6 caracteres')
        validated = false
    }else{
        validated = true
    }
    

     /* Validación celular */
    //  !/[0-9]/.test(data.cel)  
  
    if(data.cel == ''){
        messageError('El número de telefono es un campo requerido')
        validated = false
    }else if (!/[0-9]{10}/.test(parseInt(data.cel))) {
        messageError('El número de telefono debe ser un numero y un máximo de 9 caracteres')
        validated = false
    }else{
        validated = true
    }
 
    if (validated) {
        console.log(validated);
        redirect(data)
    }
     
}

function messageError(message){
    error.innerHTML += `
        ${message}
        <br>
    `
}

function redirect(data){
    document.getElementById('registro').reset();
     window.location.href="/pages/works.html" ;
     console.log(data);
     userName.innerHTML=`${data.name}` 
}

/* ************END REGISTER************ */



/* ************TO DO LIST************ */

document.getElementById('tareas').addEventListener('submit',saveTask)

/* Guardar Tarea */
function saveTask(e){
   
    let tarea = document.getElementById('task').value

    const task ={
         tarea
    }

    if(localStorage.getItem('tasks')==null){
        let tasks=[]
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    getTask();

    document.getElementById('tareas').reset();
    e.preventDefault();
}

/* FIN Guardar Tarea */

/* Obtener Tarea y listar*/
function getTask(){
    let tasks = JSON.parse(localStorage.getItem('tasks'))

   let tasksList = document.getElementById('tasks')

   tasksList.innerHTML = ''

    tasks.forEach(i=>{
       /*  console.log(i.tarea, "Hola"); */
         tasksList.innerHTML += `
            <div onclick="deleteTask('${i.tarea}')"> 
                <p>${i.tarea}</p>
            <div>
        ` 
    })
  }
  getTask();

/* FIN Obtener Tarea  y listar*/


/* Eliminar Tarea */
    function deleteTask(tarea){
       let tasks = JSON.parse(localStorage.getItem('tasks'))
        

     /*   tasks.forEach(i=>{
        if(tasks[i].tarea == tarea){
            tasks.splice(i,1);              
        }
       }); */
        for(let i =0 ; i< tasks.length; i ++){
            if(tasks[i].tarea == tarea){
                tasks.splice(i,1);              
            } 
        }

        localStorage.setItem('tasks', JSON.stringify(tasks))
        getTask()
      
    }
/* FIN Eliminar Tarea */
/* ************END TO DO LIST************ */
