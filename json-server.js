let id = -1

document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault()    
    data={
        img:document.querySelector("#img").value,
        name:document.querySelector("#name").value,
        email:document.querySelector("#email").value,
        course:document.querySelector("#course").value,
        grid:document.querySelector("#grid").value
    }

    let value =document.querySelector("#value").value

    if(value == "submit"){
        fetch("http://localhost:8080/student",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        })
    }
    else{

        fetch(`http://localhost:8080/student/${id}`,{
            method:"PATCH",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(data)
        })
        document.querySelector("#img").value=""
        document.querySelector("#name").value=""
        document.querySelector("#email").value=""
        document.querySelector("#course").value=""
        document.querySelector("#grid").value=""
        document.querySelector("value").value="submit"
    }
})

const output = (data) =>{
    data.map((ele)=>{
        let img  = document.createElement("img")
        img.src=ele.img
        let name = document.createElement("h2")
        name.innerHTML=ele.name
        let email = document.createElement("h3")
        email.innerHTML=ele.email
        let course = document.createElement("h3")
        course.innerHTML=ele.course
        let grid = document.createElement("h3")
        grid.innerHTML=ele.grid

        let btn1 =document.createElement("button")
        btn1.innerHTML="Delete"
        btn1.addEventListener("click", () => {
            dlt(ele.id)
        })

        let btn2 =document.createElement("button")
        btn2.innerHTML="Update"
        btn2.addEventListener("click", () => {
            document.querySelector("#img").value=ele.img
            document.querySelector("#name").value=ele.name
            document.querySelector("#email").value=ele.email
            document.querySelector("#course").value=ele.course
            document.querySelector("#grid").value=ele.grid
            document.querySelector("#value").value= "Update"
            id=ele.id
        })

        let dltdiv = document.createElement("div")
        dltdiv.append(btn1,btn2)
        dltdiv.setAttribute("id","dltdiv")  
        let div = document.createElement("div")
        div.append(img,name,email,course,grid,dltdiv)
        document.querySelector("#ui").append(div)
    })
}

// DELETE 

let dlt = async (id) =>{
    fetch(`http://localhost:8080/student/${id}`,{
        method:"DELETE"
    })
}

// GET

fetch("http://localhost:8080/student",)
.then((data) =>data.json())
.then((json) => output(json))