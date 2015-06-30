require 'test_helper'

class PostUsersControllerTest < ActionController::TestCase
  setup do
    @post_user = post_users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:post_users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create post_user" do
    assert_difference('PostUser.count') do
      post :create, post_user: { post_id: @post_user.post_id, user_id: @post_user.user_id }
    end

    assert_redirected_to post_user_path(assigns(:post_user))
  end

  test "should show post_user" do
    get :show, id: @post_user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @post_user
    assert_response :success
  end

  test "should update post_user" do
    patch :update, id: @post_user, post_user: { post_id: @post_user.post_id, user_id: @post_user.user_id }
    assert_redirected_to post_user_path(assigns(:post_user))
  end

  test "should destroy post_user" do
    assert_difference('PostUser.count', -1) do
      delete :destroy, id: @post_user
    end

    assert_redirected_to post_users_path
  end
end
