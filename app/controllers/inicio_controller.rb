class InicioController < ApplicationController
  skip_before_filter  :verify_authenticity_token
  require "json"
  def index
  end

  def login
  	respond=(Member.verificate_account params[:username], params[:password]) ? "ok" : "0"
  	respond_to do |format|
  		format.html{render :text=>respond}
  		format.json
  	end  	
  end

  def backup
    parse=JSON.parse(params[:backupjson])    
    parse.keys.each do |key|
      parse[key].each do |post|
        ob=Post.new({title:post["title"],description:post["description"],post_id:post["id"],column:post["column"]})
        ob.backup_member=params[:username]
        ob.save
      end
    end
    respond_to do |format|
      format.html{render :text=>"ok"}
      format.json 
    end
  end

  def restore
    respond_to do |format|
      format.html{render :text=>Post.restore_backup(params[:username]).to_json}
      format.json 
    end
  end
end
