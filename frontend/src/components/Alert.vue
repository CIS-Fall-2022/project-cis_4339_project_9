<script>
   import axios from "axios";

    export default {
        data() {
            return {
                student: {
                   firstName: '',
                   lastName: '',
                   email: '',
                   phoneNumber: '',
                   studentID: ''
                }
            }
        }, 
        methods: {
    handelSubmit: function(e) {
      var self = this;
      data = {};
      data['firstName'] = this.firstName;
      data['lastName'] = this.lastName;
      data['email'] = this.email;
      data['phoneNumber'] = this.phoneNumber;
      data['studentID'] = this.studentID;
      // Ajax call
      var response = { errors: {} };
      response.errors.username = { message: "This username is already taken", status: false, errorType: 3, xDebug: '[,…]'};
      this.errors.username = JSON.stringify(response.errors.username).replace(/\"/g, "");
    }
  }
}     
    
</script>
