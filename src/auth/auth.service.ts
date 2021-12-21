import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { Mongoose } from 'mongoose';
import { config } from 'dotenv';

config();

@Injectable()
export class AuthService {
  // google login
  googleLogin(req: any) {
    // let's connect to mongodb and save the user in our database using mongoose.
    let user = new User(req.user);
    let connection = new Mongoose();
    connection.connect(process.env.PROD_MONGODB);
    connection.connection.on('error', (err) => {
      console.log(err);
    });
    connection.connection.once('open', () => {
      console.log('Connected to mongodb');
      connection.connection.db
        .collection('users')
        .findOne({
          googleId: user.googleId,
        })
        .then((result) => {
          if (result) {
            console.log('User already exists \n\n' + JSON.stringify(result));
            // now we update the user if something has changed in the google profile (like email).
            connection.connection.db.collection('users').updateOne(
              {
                googleId: user.googleId,
              },
              {
                $set: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  avatar: user.avatar,
                },
              },
            );
            return {
              message: 'Welcome back ' + user.firstName,
              user: user,
            };
          } else {
            connection.connection.db
              .collection('users')
              .insertOne(user)
              .then((result) => {
                console.log('User saved. Here is what was saved \n\n' + JSON.stringify(result));
              });
          }
        });
    });
    return {
      message: 'Welcome ' + user.firstName,
      user: user,
    };
  }

  // github login
  githubLogin(req: any) {
    let user = new User(req.user);
    let connection = new Mongoose();
    connection.connect(process.env.PROD_MONGODB);
    connection.connection.on('error', (err) => {
      console.log(err);
    });
    connection.connection.once('open', () => {
      console.log('Connected to mongodb');
      connection.connection.db
        .collection('users')
        .findOne({
          githubId: user.githubId,
        })
        .then((result) => {
          if (result) {
            console.log('User already exists \n\n' + JSON.stringify(result));
            // now we update the user if something has changed in the github profile (like email).
            connection.connection.db.collection('users').updateOne(
              {
                githubId: user.githubId,
              },
              {
                $set: {
                  displayName: user.displayName,
                  email: user.email,
                  avatar: user.avatar,
                },
              },
            );
            return {
              message: 'Welcome back ' + user.displayName,
              user: user,
            };
          } else {
            connection.connection.db
              .collection('users')
              .insertOne(user)
              .then((result) => {
                console.log('User saved: Here is what was saved: \n\n' + JSON.stringify(result));

              });
          }
        });
    });
    return {
      message: 'Welcome ' + user.displayName,
      user: user,
    };
  }
  // logout function
  logout(req: any) {
    req.logout();
    return {
      message: 'Logged out',
    };
  }
}
