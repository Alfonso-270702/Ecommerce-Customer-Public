import axios from 'axios'
import Swal from 'sweetalert2'
const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `${error.response.data.errors.join(', ')}`
  })
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default instance
