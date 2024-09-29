import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Platform, StyleSheet, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  }
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert("Error", "You need to enable push notifications");
        return;
      }

      const pushToken = await Notifications.getExpoPushTokenAsync({ projectId: 'com.alentesting.notificationapp' });
      console.log(pushToken);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();

  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("notif recv");
      console.log(notification);
    });

    const sub2 = Notifications.addNotificationResponseReceivedListener((resp) => {
      console.log("Notif resp recv");
      console.log(resp);
    });

    return () => {
      subscription.remove();
      sub2.remove();
    }
  }, []);

  function scheduleNotificationsHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Local notif',
        body: 'I am notifying you about something',
        data: {
          username: 'Alen'
        }
      },
      trigger: {
        seconds: 5
      }
    });
  }

  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: "Notification",
        body: "I am sending you a notification",
        to: "PUSH_TOKEN"
      })
    })
  }

  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={scheduleNotificationsHandler} />
      <Button title="Push Notification" onPress={sendPushNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
