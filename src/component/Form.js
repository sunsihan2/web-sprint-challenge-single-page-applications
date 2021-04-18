import React ,{useState, useEffect}from "react";
import * as yup from "yup"
import axios from "axios"


export default function Form(){
    const initialFormState ={
        name:"",
        size:"",
        topping:"",
        specialInstruction:"",
        pepperoni: false,
        sausage: false,
        canadianBacon: false,
        spicyItalianSausage: false,
        grilledChicken:false,
        onions: false,
        greenPepper: false,
        dicedTomatos: false,
        blackOlives: false,
        roastedGarlic: false,
        artichokeHearts: false,
        threeCheese:false,
        pineapple:false,
        extraCheese:false,
    }

    const [pizza, setPizza] = useState([]);
    const [serverError, setServerError] = useState("")
    const[formState, setFormState] = useState(initialFormState)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [errors, setErrors] = useState(initialFormState)

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Name is a required ")
            .min(3," Name must be 3 chars or longer"),

        size: yup.string().oneOf(["small", "medium", "large"], "Size is require"), 

        pepperoni: yup.boolean(),
        sausage: yup.boolean(),
        canadianBacon: yup.boolean(),
        spicyItalianSausage: yup.boolean(),
        grilledChicken: yup.boolean(),
        onions: yup.boolean(),
        greenPepper: yup.boolean(),
        dicedTomatos: yup.boolean(),
        blackOlives: yup.boolean(),
        roastedGarlic: yup.boolean(),
        artichokeHearts: yup.boolean(),
        threeCheese: yup.boolean(),
        pineapple: yup.boolean(),
        extraCheese: yup.boolean(),

        specialInstruction: yup.string()
    })

    const validateChange = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({...errors,[e.target.name]: ""});
            })
            .catch(err => {
                setErrors({...errors,[e.target.name]: err.errors[0]})
            })
    }

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("valid?", valid);
            setIsButtonDisabled(!valid)
        })
    },[formState])

    const postNewPizza = newPizza => {
        axios
        .post("h",formState)
        .then(Response => {
            setPizza(Response.data)
            setFormState({
                name:"",
                size:"",
                topping:"",
                specialInstruction:"",
            })
            setServerError(null)
        })
        .catch(err => {
            setServerError("oops! something happened!");
        })
    }

    const formSubmit = e => {
        e.preventDefault()
        const newPizza ={
            name:formState.name.trim(),
            size:formState.size.trim(),
            specialInstruction:formState.specialInstruction.trim(),
            topping:['pepperoni','sausage','canadianBacon', 'spicyItalianSausage',
                    'grilledChicken', 'onions', 'greenPepper', 'dicedTomatos',
                    'blackOlives', 'roastedGarlic', 'artichokeHearts', 'threeCheese',
                    'pineapple','extraCheese'].filter(top => formState[top])
        }
        postNewPizza(newPizza)
    }

    const inputChange = e => {
        console.log("change: value= ",e.target.value)
        const {name, value, type, checked} = e.target
        const valueToUse = type ==="checkbox"? checked: value
        e.persist()
        const newFormData = {
            ...formState,
            [e.target.name]:e.target.value ==="checkbox" ? e.target.checked : e.target.value
        }
        validateChange(e)
        setFormState(newFormData)
    }

    return (
        <form>
             {serverError ? <p className="error">{serverError}</p> : null}
            <h2>Build your own pizza</h2>
            <img src ="https://www.budgetbytes.com/wp-content/uploads/2010/07/Classic-Homemade-Pizza-Dough-close.jpg"/>

            <h4>build your own pizza</h4>
            <label htmlFor ="name"> Name
                <input id="name" type="text" name="name"
                onChange={inputChange} value={formState.name}/>
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>

            <label htmlFor ="size" className="size"> Choice of size   Required
                <select id="size" name="size" onChange={inputChange} value={formState.size}>
                    <option value='' >--Please choose an option --</option>
                    <option value="small">small</option>
                    <option value="medium">medium</option>
                    <option value="large">large</option>
                </select>
                {errors.size.length > 0 ? (
                    <p className="error">{errors.size}</p>
                ) : null}
            </label>
            

            <div className="form-group checkboxes">
                <h4>Add toppings</h4>
                <br/>
                <h5>Choose up to 10.</h5>

                <label>Pepperoni
                    <input type="checkbox" name="pepperoni"
                    checked = {pizza.pepperoni} onChange = {inputChange}/>
                </label>

                <label>Sausage
                    <input type="checkbox" name="sausage"
                    checked = {pizza.sausage} onChange = {inputChange}/>
                </label>

                <label>Canadian Bacon
                    <input type="checkbox" name="canadianBacon"
                    checked = {pizza.canadianBacon} onChange = {inputChange}/>
                </label>

                <label>Spicy Italian Sausage
                    <input type="checkbox" name="spicyItalianSausage"
                    checked = {pizza.spicyItalianSausage} onChange = {inputChange}/>
                </label>
                <label>Grilled Chicken
                    <input type="checkbox" name="grilledChicken"
                    checked = {pizza.grilledChicken} onChange = {inputChange}/>
                </label>

                <label>Onions
                    <input type="checkbox" name="onions"
                    checked = {pizza.onions} onChange = {inputChange}/>
                </label>

                <label>Green Pepper
                    <input type="checkbox" name="greenPepper"
                    checked = {pizza.greenPepper} onChange = {inputChange}/>
                </label>

                <label>Diced Tomatos
                    <input type="checkbox" name="dicedTomatos"
                    checked = {pizza.dicedTomatos} onChange = {inputChange}/>
                </label>

                <label>Black Olives
                    <input type="checkbox" name="blackOlives"
                    checked = {pizza.blackOlives} onChange = {inputChange}/>
                </label>

                <label>Roasted Garlic
                    <input type="checkbox" name="roastedGarlic"
                    checked = {pizza.roastedGarlic} onChange = {inputChange}/>
                </label>

                <label>Artichoke Heart
                    <input type="checkbox" name="artichokeHearts"
                    checked = {pizza.artichokeHearts} onChange = {inputChange}/>
                </label>

                <label>Three Cheese
                    <input type="checkbox" name="threeCheese"
                    checked = {pizza.threeCheese} onChange = {inputChange}/>
                </label>

                <label>Pineapple
                    <input type="checkbox" name="pineapple"
                    checked = {pizza.pineapple} onChange = {inputChange}/>
                </label>

                <label>Extra Cheese
                    <input type="checkbox" name="extraCheese"
                    checked = {pizza.extraCheese} onChange = {inputChange}/>
                </label>

            </div>

            <label htmlFor="specialInstruction"> Special Instructions
                <textarea name="specialInstruction" onChange={inputChange} value={formState.specialInstruction} />
                {errors.specialInstruction.length > 0 ? (
                    <p className="error">{errors.specialInstruction}</p>
                    ) : null}
            </label>

         
            <button id= 'submitBtn' disabled={isButtonDisabled} type="submit">
                Submit
            </button>

        </form>
    )
}