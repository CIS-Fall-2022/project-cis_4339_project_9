<script>
   import axios from "axios";

    export default {
        data() {
            return {
                client: {
                   firstName: '',
                   middleName:'',
                   lastName: '',
                   email: '',
                   phoneNumber: ''
               
                }
            }
        }, 
        methods: {
    handelSubmit: function(e) {
      var self = this;
      data = {};
      data['firstName'] = this.firstName;
      data['lastName'] = this.lastName;
      data['middleName'] = this.middleName;
      data['email'] = this.email;
      data['phoneNumber'] = this.phoneNumber;
      
      // Ajax call
      var response = { errors: {} };
      response.errors.username = { message: "This username is already taken", status: false, errorType: 3, xDebug: '[,…]'};
      this.errors.username = JSON.stringify(response.errors.username).replace(/\"/g, "");
    }
  }
},
validations() {
    return {
      client: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        email: { email },
        phoneNumbers: [
          {
            primaryPhone: { required, numeric },
          },
        ],
      },
    };
  }
} 
    // ignore comment
</script>
