import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Loginscreen from './screens/loginscreen';  
import BooksScreen from './screens/BooksScreen';
import BookListScreen from './screens/BookListScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import BookSearchScreen from './screens/BookSearchScreen';

// Root Stack of App
function RootNavigator() {
  const BookStack = createSharedElementStackNavigator();

  const fadeScreen = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const bookTransition = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  const searchTransition = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  return (
    <BookStack.Navigator
      initialRouteName="Login" // Set Loginscreen as the initial route
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      detachInactiveScreens={false}
    >
      <BookStack.Screen name="Login" component={Loginscreen} />
      <BookStack.Screen name="Books" component={BooksScreen} />
      <BookStack.Screen name="BookList" component={BookListScreen} />
      <BookStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        sharedElements={(route, otherRoute) => {
          if (['BookList', 'BookSearch'].includes(otherRoute.name)) {
            return [route.params.book.bookId];
          }
          return [];
        }}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: fadeScreen,
          transitionSpec: {
            open: bookTransition,
            close: bookTransition,
          },
        }}
      />
      <BookStack.Screen
        name="BookSearch"
        component={BookSearchScreen}
        sharedElements={(_, otherRoute) => (otherRoute.name === 'BookList' ? [{
          id: 'search',
          animation: 'fade',
          resize: 'clip',
          align: 'left-top',
        }] : [])}
        options={{
          cardStyleInterpolator: fadeScreen,
          transitionSpec: {
            open: searchTransition,
            close: searchTransition,
          },
        }}
      />
    </BookStack.Navigator>
  );
}

export default React.memo(RootNavigator);
