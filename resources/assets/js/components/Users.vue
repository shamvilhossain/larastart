<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-success" @click="newModal">Add New User</button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type | upText}}</td>
                      <td>{{user.created_at | myDate}}</td>
                      <td>
                         <a href="#" @click="editModal(user)">
                            <i class="fa fa-edit text-blue"></i>
                         </a> 
                         /
                         <a href="#" @click="deleteUser(user.id)">
                            <i class="fa fa-trash text-red"></i>
                         </a>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        
        </div>
        <!-- Modal -->
            <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewLabel">Add New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="createUser">
                <div class="modal-body">
                    <div class="form-group">
                      <input v-model="form.name" type="text" name="name"
                        placeholder="Name"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                      <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group">
                      <input v-model="form.email" type="email" name="email"
                        placeholder="Email"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                      <has-error :form="form" field="email"></has-error>
                    </div>
                    
                    <div class="form-group">
                        <textarea v-model="form.bio" name="bio" id="bio"
                        placeholder="Short bio for user (Optional)"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                        <has-error :form="form" field="bio"></has-error>
                    </div>


                    <div class="form-group">
                        <select name="type" v-model="form.type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">Standard User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </div>

                    <div class="form-group">
                        <input v-model="form.password" type="password" name="password" id="password"
                        class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
                </form>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
    export default {
        data () {
          return {
            users:{},
            // Create a new form instance
            form: new Form({
              name: '',
              email: '',
              password: '',
              type: '',
              bio: '',
              photo: ''
            })
          }
        },
        methods: {
          editModal(user){
            this.form.reset();
             $('#addNew').modal('show');
             this.form.fill(user);
          },
          newModal(){
            this.form.reset();
             $('#addNew').modal('show');
          },
          deleteUser (id) {
              Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              // send request to server
              // will call destroy method in controller
              if (result.value) {
                this.form.delete('api/user/'+id).then(()=>{  
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  Fire.$emit('afterCreate');
                }).catch(()=>{
                  swal('Failed',"there was something wrong.","warning");
                }) 
              }
                
              
            })
          },
          loadUsers () {
            axios.get('api/user').then(({ data }) => (this.users = data.data) );
          },
          createUser () {
            this.$Progress.start()
            // Submit the form via a POST request
            this.form.post('api/user')
            .then(()=>{
                Fire.$emit('afterCreate');
                $('#addNew').modal('hide')

                Toast.fire({
                  type: 'success',
                  title: 'User Created Successfully'
                })
                this.$Progress.finish()
            })
            .catch(()=>{

            })
            
          }
        },
        mounted() {
            this.loadUsers();
            Fire.$on('afterCreate',() => {
              this.loadUsers();
            });
            //setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
