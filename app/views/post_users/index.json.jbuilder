json.array!(@post_users) do |post_user|
  json.extract! post_user, :id, :post_id, :user_id
  json.url post_user_url(post_user, format: :json)
end
