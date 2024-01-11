import { Switch, View } from 'react-native';
import MyText from '~/components/ui/my-text';
import { type NotificationType } from '~/types/notification';
import { useNotification } from '~/zustand/notification/useNotification';

const notifications: NotificationType[] = [
  {
    id: 'morning',
    label: '☕️ Les nouvelles matinales ',
    description: 'Notification pour bien commencer la journée à 7h. ',
  },
  {
    id: 'evening',
    label: '🌇️ Les nouvelles de soirée ',
    description:
      'Terminez votre journée en beauté ! Recevez une notification à 19h',
  },
  {
    id: 'alert',
    label: '⚠️️ Alertes d’urgence',
    description:
      'Soyez informé immédiatement en cas de seuil critique atteint.',
  },
];

export function NotificationsList() {
  const { selectedNotifications, setSelectedNotifications } = useNotification(
    (state) => state,
  );
  function toggleSwitch(id: string) {
    if (selectedNotifications?.includes(id)) {
      setSelectedNotifications(
        selectedNotifications.filter((item) => item !== id),
      );
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  }

  return (
    <View className="space-y-2">
      {notifications?.map((notification) => {
        const isEnabled = selectedNotifications?.includes(notification.id);
        return (
          <View
            key={notification.id}
            className="mt-4 flex flex-row items-center justify-between rounded-lg bg-white p-4"
          >
            <View className="w-3/4">
              <MyText font="MarianneBold" className=" text-lg">
                {notification.label}
              </MyText>
              <MyText font="MarianneRegular" className=" text-sm">
                {notification.description}
              </MyText>
            </View>
            <View className="">
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  toggleSwitch(notification.id);
                }}
                value={isEnabled}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
