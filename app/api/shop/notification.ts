import { gql } from "@apollo/client";

export const QUERY_GET_SHOP_NOTIFICATIONS = gql`
  query ShopGetNotifications(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: NotificationWhereInput
  ) {
    shopGetNotifications(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        title
        description
        is_read
        notification_type
        status
        created_at
        reference_id
        data
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_MARK_NOTIFICATION_AS_READ = gql`
  mutation ShopReadNotification($shopReadNotificationId: ID!) {
    shopReadNotification(id: $shopReadNotificationId) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
