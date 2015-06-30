json.array!(@members) do |member|
  json.extract! member, :id, :email, :username, :password, :range
  json.url member_url(member, format: :json)
end
