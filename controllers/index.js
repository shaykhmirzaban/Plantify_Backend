const bcrypt = require("bcryptjs");
const authenticationModel = require("../modules/authentication");
const curdModel = require("../modules/curdSchema");
const userOrderModel = require("../modules/UserOrder");

// *****************
// AUTHENTICATION
// *****************
const authenticationController = {
  signUp: (req, res) => {
    let { email, password } = req.body;

    if (email && password) {
      // password check
      // var Password = "";
      // if (password === rePassword) {
      //   Password = bcrypt.hashSync(password, 10);
      // } else {
      //   res.json({
      //     message: "Password desn't match",
      //     status: false,
      //   });
      // }
      let Password = bcrypt.hashSync(password, 10);

      // user data convert into object
      const userData = {
        email: email,
        password: Password,
      };

      authenticationModel.create(userData, (err, data) => {
        if (err) {
          res.json({
            message: `Internal Server Error: ${err}`,
            status: false,
          });
        } else {
          res.json({
            message: "Successfully create an account",
            data: data,
            status: true,
          });
        }
      });
    } else {
      res.json({
        message: "All field are required",
        status: false,
      });
    }
  },
  login: (req, res) => {
    let { email, password } = req.body;

    if (email && password) {
      authenticationModel.findOne({ email: email }, (err, data) => {
        if (err) {
          res.json({
            message: `Internal Server Error: ${err}`,
            status: false,
          });
        } else if (data) {
          console.log(data.password);
          const flag = bcrypt.compareSync(password, data.password);

          if (flag) {
            res.json({
              message: "Successfully Login",
              data: data,
              status: true,
            });
          } else {
            res.json({
              message: "Password incorrect",
              status: false,
            });
          }
        } else {
          res.json({
            message: "Email doesn't exist",
            status: false,
          });
        }
      });
    } else {
      res.json({
        message: "All field are required",
        status: false,
      });
    }
  },
  forgotpassword: (req, res) => {
    let { email, password } = req.body;

    if (email && password) {
      authenticationModel.findOne({ email: email }, (err, data) => {
        if (err) {
          res.json({
            message: `Internal Server Error: ${err}`,
            status: false,
          });
        } else if (data) {
          const Password = bcrypt.hashSync(password, 10);

          let userPassword = {
            password: Password,
          };

          authenticationModel.findByIdAndUpdate(
            data._id,
            userPassword,
            (err, data) => {
              if (err) {
                res.json({
                  message: `Internal Server Error: ${err}`,
                  status: false,
                });
              } else {
                res.json({
                  message: "Successfully update password",
                  status: true,
                });
              }
            }
          );
        } else {
          res.json({
            message: "Email is not correct",
            status: false,
          });
        }
      });
    } else {
      res.json({
        message: "Email field are empty",
        status: false,
      });
    }
  },
  deleteAccount: (req, res) => {
    let data = req.body;
    if (data) {
      // check
      authenticationModel.findOneAndDelete(data.email, (err, data) => {
        if (err) {
          res.json({
            message: `Internal Server error: ${err}`,
            status: false,
          });
        } else {
          res.json({
            message: `Successfullt delete an account`,
            status: true,
          });
        }
      });

      //   //   extra

      // authenticationModel.find({ password: password }, (err, data) => {
      //   if (err) {
      //     res.json({
      //       message: `Internal Server Error: ${err}`,
      //       status: false,
      //     });
      //   } else {
      //     authenticationModel.findByIdAndDelete(data._id, (err, data) => {
      //       if (err) {
      //         res.json({
      //           message: `Internal Server error: ${err}`,
      //           status: false,
      //         });
      //       } else {
      //         res.json({
      //           message: "Successfully delete an account",
      //           status: true,
      //         });
      //       }
      //     });
      //   }
      // });
    } else {
      res.json({
        message: "Password is not correct",
        status: false,
      });
    }
  },
};

// *************************
// CURD OPERATION
// *************************
const crudController = {
  getData: (req, res) => {
    curdModel.find({}, (err, data) => {
      if (err) {
        res.json({
          message: `Internal Server Error: ${err}`,
          status: false,
        });
      } else if (data) {
        res.json({
          message: `Successfully recive data`,
          data: data,
          status: true,
        });
      } else {
        res.json({
          message: "Empty data",
          status: false,
        });
      }
    });
  },
  createData: (req, res) => {
    const {
      name,
      description,
      price,
      title,
      size,
      colorCode,
      category,
      image,
    } = req.body;

    if (
      name &&
      description &&
      price &&
      title &&
      size &&
      colorCode &&
      category &&
      image
    ) {
      // convert into object
      const userData = {
        name: name,
        description: description,
        price: price,
        title: title,
        size: size,
        color_code: colorCode,
        category: category,
        image: image,
      };

      curdModel.create(userData, (err, data) => {
        if (err) {
          res.json({
            message: `Internal Server Error: ${err}`,
            status: false,
          });
        } else {
          res.json({
            message: "Successfully created data",
            status: true,
          });
        }
      });
    } else {
      res.json({
        message: "All field are required",
        status: false,
      });
    }
  },
  updateData: (req, res) => {
    let { id, name, description, price } = req.body;

    const userData = {
      name: name,
      description: description,
      price: price,
    };

    curdModel.findByIdAndUpdate(id, userData, (err, data) => {
      if (err) {
        res.json({
          message: `Internal Server error: ${err}`,
          status: false,
        });
      } else {
        res.json({
          message: "Successfully recive data",
          status: true,
        });
      }
    });
  },
  deleteData: (req, res) => {
    const { id } = req.body;
    console.log(id);
    curdModel.findByIdAndDelete(id, (err, data) => {
      if (err) {
        res.json({
          message: `Internal Server Error: ${err}`,
          status: false,
        });
      } else {
        res.json({
          message: "Successfully delete data",
          status: true,
        });
      }
    });
  },
};

// ==========
// USER ORDER
// ==========
const userOrderController = {
  createData: (req, res) => {
    let data = req.body;

    if (data) {
      const dataArrange = {
        user_data: data.data,
        user_info: data.userValue,
      };
      userOrderModel.create(dataArrange, (err, data) => {
        if (err) {
          res.json({
            message: `Internal Server Error: ${err}`,
            status: false,
          });
        } else {
          res.json({
            message: `Successfully recive data`,
            data: data,
            status: true,
          });
        }
      });
    }
  },

  getData: (req, res) => {
    userOrderModel.find({}, (err, data) => {
      if (err) {
        res.json({
          message: `Internal Server Error: ${err}`,
          status: false,
        });
      } else if (data) {
        res.json({
          message: `Successfully recive data`,
          data: data,
          status: true,
        });
      } else {
        res.json({
          message: "Empty data",
          status: false,
        });
      }
    });
  },

  deleteData: (req, res) => {
    let { id } = req.body;
    userOrderModel.findByIdAndDelete(id, (err, data) => {
      if (err) {
        res.json({
          message: `Internal Server Error: ${err}`,
          status: false,
        });
      } else {
        res.json({
          message: "Successfully delete data",
          status: true,
        });
      }
    });
  },
};

// bottom part
// ===========
module.exports = {
  authenticationController,
  crudController,
  userOrderController,
};

// bcrypt intall kerna hy*************
