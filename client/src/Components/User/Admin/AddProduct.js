import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';

import FormField from '../../Utils/Form/FormField';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../Utils/Form/FormAction';
import FileUpload from '../../Utils/Form/FileUpload';
import { getBrands, getWoods, addOneProduct, clearProduct } from '../../../actions/products_action';

import { connect } from 'react-redux';


class AddProduct extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label:'Prodcut name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter the name'
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label:'Prodcut description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter the description'
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:''
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label:'Prodcut price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter the price'
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label:'Brand',
          name: 'brand_input',
          options: []
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label:'Wood',
          name: 'wood_input',
          options: []
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label:'Frets',
          name: 'frets_input',
          options: [
            {key: 20, value: 20},
            {key: 21, value: 21},
            {key: 22, value: 22},
            {key: 24, value: 24},
          ]
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label:'Shipping',
          name: 'shipping_input',
          options: [
            {key: 'Yes', value: true},
            {key: 'No', value: false}
          ]
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label:'Available',
          name: 'available_input',
          options: [
            {key: 'Yes', value: true},
            {key: 'No', value: false}
          ]
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label:'Publish',
          name: 'publish_input',
          options: [
            {key: 'Public', value: true},
            {key: 'Hidden', value: false}
          ]
        },
        validation: {
          required: true,
          email: false
        },
        valid: false,
        touched: false,
        validationMessage:'',
        showLabel: true
      },
      images: {
        element: 'select',
        value: '',
        validation: {
          required: true,
          email: false
        },
        valid: true,
        touched: false,
        validationMessage:'',
        showLabel: false
      }

    }
  }

  updateFields = (newFormData) => {
    this.setState({
      formData: newFormData
    })
  }

  componentDidMount()
  {
    const formData = this.state.formData;

    this.props.dispatch(getBrands()).then( response => {
      const newFormData = populateOptionFields(formData, this.props.products.brands, 'brand');
      console.log(newFormData);
      this.updateFields(newFormData);
    })

    this.props.dispatch(getWoods()).then( response => {
      const newFormData = populateOptionFields(formData, this.props.products.woods, 'wood');
      console.log(newFormData);
      this.updateFields(newFormData);
    })
  }

  resetFieldsHandler = () => {
    const newFormdata = resetFields(this.state.formData, 'products');
    this.setState({
      formData: newFormdata,
      formSuccess: true
    });
    setTimeout(() => {
      this.setState({
      formData: newFormdata,
      formSuccess: false
    }, () => {
      this.props.dispatch(clearProduct())
    });
    }, 3000);
  }

  submitForm = (event) => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData, 'products');

    let formIsValid = isFormValid(this.state.formData, 'products');
    if(formIsValid)
    {
      
      this.props.dispatch(addOneProduct(dataToSubmit)).then(() => {
        console.log(this.props.products);
        if(this.props.products.newProduct.success) {
          this.resetFieldsHandler();

        }
        else {
          this.setState({formError: true})
        }
      })
    
    }
    else {
      this.setState({
        formError: true
      })
    }
  }

  updateForm = (element) => {

    const newFormdata = update(element, this.state.formData, 'products');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  imagesHandler = (images) => {

    const newFormData = {
      ...this.state.formData
    }

    newFormData['images'].value = images;
    newFormData['images'].valid = true;
    this.setState({
      formData: newFormData
    })

  }

  render() {
    return (
      
        <UserLayout>
          <div>
            <h1>AddProduct</h1>
            <form onSubmit={(event) => this.submitForm(event)} >
              <FileUpload 
                imagesHandler={(e) => this.imagesHandler(e)}
                reset={this.state.formSuccess}
              />
              <FormField 
                id={'name'}
                formData={this.state.formData.name}
                change={(element)=> this.updateForm(element)}
              />
              <FormField 
                id={'description'}
                formData={this.state.formData.description}
                change={(element)=> this.updateForm(element)}
              />
              <FormField 
                id={'price'}
                formData={this.state.formData.price}
                change={(element)=> this.updateForm(element)}
              />
              <div className='form_devider'/>
              <FormField 
                id={'brand'}
                formData={this.state.formData.brand}
                change={(element)=> this.updateForm(element)}
              />
              <FormField 
                id={'wood'}
                formData={this.state.formData.wood}
                change={(element)=> this.updateForm(element)}
              />
              <FormField 
                id={'frets'}
                formData={this.state.formData.frets}
                change={(element)=> this.updateForm(element)}
              />
              <FormField 
                id={'available'}
                formData={this.state.formData.available}
                change={(element)=> this.updateForm(element)}
              />
              <FormField 
                id={'shipping'}
                formData={this.state.formData.shipping}
                change={(element)=> this.updateForm(element)}
              />
              <div className='form_devider'/>
              <FormField 
                id={'publish'}
                formData={this.state.formData.publish}
                change={(element)=> this.updateForm(element)}
              />
              {
                this.state.formSuccess ?
                <div className='form_success'>
                  Success
                </div>
                : null
              }

              {
                this.state.formError ?
                <div className='error_label'>
                  Please check your data
                </div>
                : null
              }
              <button onClick={(event)=> this.submitForm(event)}>
                Submit
              </button>
            </form>
          </div>
        </UserLayout>
    
    )
  }
}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}

export default connect(mapStateToProps)(AddProduct);